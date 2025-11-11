import { useState, useEffect } from 'react';
import RadarScanBackground from '../components/RadarScanBackground';
import EnhancedRadar from '../components/EnhancedRadar';
import StockInfoCardNew from '../components/StockInfoCardNew';
import YellowDiagnosisButton from '../components/YellowDiagnosisButton';
import StockPerformanceList from '../components/StockPerformanceList';
import HexagonRadarChart from '../components/HexagonRadarChart';
import NewDiagnosisModal from '../components/NewDiagnosisModal';
import Footer from '../components/Footer';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion, trackEvent } from '../lib/googleTracking';
import { createPlaceholderStockData, isPlaceholderData } from '../lib/placeholderData';

interface StockPerformanceItem {
  nameJp: string;
  code: string;
  prediction: string;
  todayChange: string;
  changePercent: string;
  isPositive: boolean;
}

export default function NewHomeRedesigned() {
  const urlParams = useUrlParams();
  const [stockCode, setStockCode] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<StockPerformanceItem[]>([]);

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>('initial');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [diagnosisStartTime, setDiagnosisStartTime] = useState<number>(0);

  useEffect(() => {
    if (urlParams.code) {
      setStockCode(urlParams.code);
      fetchStockData(urlParams.code);
    }
  }, [urlParams.code]);

  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) {
        await userTracking.trackPageLoad({
          stockCode: stockCode,
          stockName: stockData.info.name,
          urlParams: {
            src: urlParams.src || '',
            gclid: urlParams.gclid || '',
            racText: urlParams.racText || '',
            code: urlParams.code || ''
          }
        });
      }
    };

    trackPageVisit();
  }, [stockData, stockCode, urlParams]);

  const fetchStockData = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/stock/data?code=${code}`);

      if (!response.ok) {
        throw new Error('株価データの取得に失敗しました');
      }

      const data = await response.json();
      setStockData(data);
      setStockCode(code);

      if (data.relatedStocks && data.relatedStocks.length > 0) {
        fetchPerformanceData(data.relatedStocks);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(errorMessage);
      setStockData(createPlaceholderStockData(code));
    } finally {
      setLoading(false);
    }
  };

  const fetchPerformanceData = async (relatedStocks: { code: string; name: string }[]) => {
    try {
      const stockCodes = relatedStocks.map(s => s.code).slice(0, 3);

      const relatedResponse = await apiClient.post('/api/stock-performance/related-performance', {
        stockCodes
      });

      let combinedData: StockPerformanceItem[] = [];

      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        if (relatedData.success && relatedData.data) {
          combinedData = relatedData.data.slice(0, 3);
        }
      }

      const hotResponse = await apiClient.get('/api/stock-performance/hot-stocks');
      if (hotResponse.ok) {
        const hotData = await hotResponse.json();
        if (hotData.success && hotData.data) {
          combinedData = [...combinedData, ...hotData.data].slice(0, 10);
        }
      }

      if (combinedData.length > 0) {
        setPerformanceData(combinedData);
      }
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    }
  };

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial' || !stockData) return;

    trackEvent('Bdd');

    setDiagnosisState('preparing');
    setDiagnosisStartTime(Date.now());
    setAnalysisResult('');

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);

      setDiagnosisState('connecting');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: stockCode,
          stockData: {
            name: stockData.info.name,
            price: stockData.info.price,
            change: stockData.info.change,
            changePercent: stockData.info.changePercent,
            per: stockData.info.per,
            pbr: stockData.info.pbr,
            dividend: stockData.info.dividend,
            industry: stockData.info.industry,
            marketCap: stockData.info.marketCap,
          },
          prices: stockData.prices,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('AI診断に失敗しました');
      }

      setDiagnosisState('processing');

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullAnalysis = '';
        let firstChunk = true;

        if (!reader) {
          throw new Error('ストリーム読み取りに失敗しました');
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              try {
                const parsed = JSON.parse(data);

                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.content) {
                  fullAnalysis += parsed.content;

                  if (firstChunk && fullAnalysis.trim().length > 0) {
                    setDiagnosisState('streaming');
                    firstChunk = false;
                  }

                  setAnalysisResult(fullAnalysis);
                }

                if (parsed.done) {
                  setDiagnosisState('results');

                  const durationMs = Date.now() - diagnosisStartTime;
                  await userTracking.trackDiagnosisClick({
                    stockCode: stockCode,
                    stockName: stockData.info.name,
                    durationMs: durationMs
                  });
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } else {
        const result = await response.json();

        if (!result.analysis || result.analysis.trim() === '') {
          throw new Error('診断結果が生成されませんでした');
        }

        setAnalysisResult(result.analysis);
        setDiagnosisState('results');

        const durationMs = Date.now() - diagnosisStartTime;
        await userTracking.trackDiagnosisClick({
          stockCode: stockCode,
          stockName: stockData.info.name,
          durationMs: durationMs
        });
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      let errorMessage = '診断中にエラーが発生しました';

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'リクエストがタイムアウトしました';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setDiagnosisState('error');
    }
  };

  const handleLineConversion = async () => {
    try {
      const response = await apiClient.get('/api/line-redirects/select');

      if (!response.ok) {
        console.error('Failed to get LINE redirect link');
        alert('LINEリンクの取得に失敗しました。しばらくしてからもう一度お試しください。');
        return;
      }

      const data = await response.json();

      if (!data.success || !data.link) {
        console.error('No active LINE redirect links available');
        alert('現在利用可能なLINEリンクがありません。');
        return;
      }

      window.location.href = data.link.line_url;

      trackConversion();

      await userTracking.trackConversion({
        gclid: urlParams.gclid
      });

      console.log('LINE conversion tracked successfully');
    } catch (error) {
      console.error('LINE conversion error:', error);
      alert('操作に失敗しました。しばらくしてからもう一度お試しください。');
    }
  };

  const closeModal = () => {
    setDiagnosisState('initial');
    setAnalysisResult('');
  };

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001a4d] via-[#001133] to-[#000a22]" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <div className="relative px-4 py-8 flex-1">
          <div className="relative text-center mb-8 pt-8">
            <EnhancedRadar />

            <div className="relative z-10 pt-24 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg text-lg font-bold shadow-lg" style={{ boxShadow: '0 0 20px rgba(0,212,255,0.5)' }}>
                  AI高精度
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                銘柄無料診断
              </h1>
            </div>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-400/30 border-t-cyan-400"></div>
              <p className="mt-4 text-cyan-300 font-medium">株価データを読み込んでいます...</p>
            </div>
          )}

          {stockData && !loading && diagnosisState === 'initial' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <StockInfoCardNew info={stockData.info} isPlaceholder={isPlaceholderData(stockData)} />

              <div className="max-w-md mx-auto">
                <YellowDiagnosisButton onClick={runDiagnosis} text="診断開始" />
              </div>

              <StockPerformanceList data={performanceData} />

              <HexagonRadarChart />

              <div className="max-w-md mx-auto mt-8">
                <YellowDiagnosisButton onClick={runDiagnosis} text="株価AI予測" />
              </div>
            </div>
          )}

          {stockData && diagnosisState === 'preparing' && (
            <div className="space-y-6 max-w-md mx-auto">
              <StockInfoCardNew info={stockData.info} />

              <div className="py-8">
                <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/30 shadow-2xl">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-bold text-cyan-300">AI診断を準備中...</p>
                      <p className="text-sm text-cyan-300/70">データを分析中</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stockData && (diagnosisState === 'connecting' || diagnosisState === 'processing') && (
            <div className="space-y-6 max-w-md mx-auto">
              <StockInfoCardNew info={stockData.info} />

              <div className="py-8">
                <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/30 shadow-2xl">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-bold text-cyan-300">診断レポートを作成中...</p>
                      <p className="text-sm text-cyan-300/70">AIが分析しています</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {diagnosisState === 'error' && (
            <div className="text-center py-20 max-w-2xl mx-auto">
              <div className="p-8 bg-slate-900/60 backdrop-blur-xl border border-red-600/30 rounded-2xl">
                <h3 className="text-xl font-bold text-red-400 mb-4">診断エラー</h3>
                <p className="text-red-300 font-semibold mb-6">{error}</p>
                <button
                  onClick={() => {
                    setDiagnosisState('initial');
                    setError(null);
                  }}
                  className="px-8 py-3 bg-[#ffd900] hover:bg-[#ffed4e] text-[#001a4d] font-bold rounded-lg transition-all shadow-lg"
                >
                  もう一度試す
                </button>
              </div>
            </div>
          )}

          <NewDiagnosisModal
            isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
            onClose={closeModal}
            analysis={analysisResult}
            stockCode={stockCode}
            stockName={stockData?.info.name || ''}
            stockPrice={stockData?.info.price || ''}
            priceChange={`${stockData?.info.change || ''} (${stockData?.info.changePercent || ''})`}
            onLineConversion={handleLineConversion}
            isStreaming={diagnosisState === 'streaming'}
            isConnecting={false}
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
