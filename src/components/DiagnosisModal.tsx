import { X, ExternalLink, FileText, Download, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { parseAnalysisContent } from '../lib/analysisParser';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  onLineConversion: () => void;
  onReportDownload: () => void;
  isStreaming?: boolean;
  isConnecting?: boolean;
}

export default function DiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  onLineConversion,
  onReportDownload,
  isStreaming = false,
  isConnecting = false,
}: DiagnosisModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDetailedAnalysisExpanded, setIsDetailedAnalysisExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastLengthRef = useRef(0);

  useEffect(() => {
    if (isStreaming && contentRef.current && analysis.length > lastLengthRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      lastLengthRef.current = analysis.length;
    }
  }, [analysis, isStreaming]);

  useEffect(() => {
    if (!isOpen) {
      setIsDetailedAnalysisExpanded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const parsedContent = parseAnalysisContent(analysis);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onReportDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-dark-secondary rounded-lg shadow-[0_0_40px_rgba(0,212,255,0.4)] overflow-hidden border-2 border-cyan-400/30">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 px-6 py-4 flex items-center justify-between border-b-2 border-cyan-400/30">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">AI診断結果（無料）</h2>
            {isConnecting && (
              <div className="flex items-center gap-2 text-white text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>接続中...</span>
              </div>
            )}
            {isStreaming && !isConnecting && (
              <div className="flex items-center gap-2 text-white text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>生成中...</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
            aria-label="閉じる"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div ref={contentRef} className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6">
          <div className="mb-6 p-4 bg-dark-card border-l-4 border-yellow-btn rounded-lg shadow-lg">
            <p className="text-sm font-semibold text-yellow-300 leading-relaxed">
              【重要なお知らせ】本サービスは金融商品の取引を勧誘するものではなく、情報提供のみを目的としています。診断結果は投資助言ではありません。株式投資には価格変動リスク、信用リスクなどが伴い、損失を被る可能性があります。最終的な投資判断はご自身の責任において行ってください。
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-cyan-400/30">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-bold shadow-md border border-cyan-400/30">
                  {stockCode}
                </div>
                <div className="text-lg font-semibold text-gray-200">{stockName}</div>
              </div>
              <div className="text-xs text-gray-400">
                {new Date().toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="bg-dark-card rounded-xl p-6 shadow-inner relative border border-cyan-400/20">
              <div className="prose prose-sm max-w-none">
                {isConnecting ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-200 font-semibold">AIサーバーに接続中...</p>
                    <p className="text-gray-400 text-sm mt-2">数秒お待ちください</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                      {parsedContent.summary}
                      {isStreaming && (
                        <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1"></span>
                      )}
                    </div>

                    {parsedContent.hasDetailedAnalysis && (
                      <div className="border-t border-gray-600 pt-4">
                        <button
                          onClick={() => setIsDetailedAnalysisExpanded(!isDetailedAnalysisExpanded)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-dark-secondary hover:bg-gray-700 rounded-lg transition-all border border-cyan-400/30 group"
                        >
                          <span className="text-gray-200 font-semibold flex items-center gap-2">
                            <span className="text-cyan-400">📊</span>
                            {isDetailedAnalysisExpanded ? 'LINEで詳細レポートをゲット' : 'LINEで詳細レポートをゲット'}
                            {isStreaming && (
                              <span className="text-xs text-gray-400">(生成中...)</span>
                            )}
                          </span>
                          {isDetailedAnalysisExpanded ? (
                            <ChevronUp className="w-5 h-5 text-cyan-400 group-hover:transform group-hover:scale-110 transition-transform" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-cyan-400 group-hover:transform group-hover:scale-110 transition-transform" />
                          )}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isDetailedAnalysisExpanded ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="bg-gradient-to-br from-dark-secondary to-dark-card p-5 rounded-lg border border-cyan-400/20">
                            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-sm">
                              {parsedContent.detailedAnalysis}
                              {isStreaming && isDetailedAnalysisExpanded && (
                                <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gradient-to-t from-dark-secondary via-dark-secondary to-transparent px-6 py-6 space-y-3">
          <button
            onClick={onLineConversion}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            <ExternalLink className="w-6 h-6" />
            無料AI診断結果をLINEで毎日受け取る
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-dark-card text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-400 border-t-transparent"></div>
                <span>ダウンロード中...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>レポートをダウンロード</span>
                <Download className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center mt-2">
            LINEで登録すると、毎日最新の株式分析レポートをお届けします
          </p>
        </div>
      </div>
    </div>
  );
}
