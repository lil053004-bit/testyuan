import { X, ExternalLink, MessageSquare, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { parseAnalysisContent } from '../lib/analysisParser';

interface NewDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  stockPrice: string;
  priceChange: string;
  onLineConversion: () => void;
  isStreaming?: boolean;
  isConnecting?: boolean;
}

export default function NewDiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  stockPrice,
  priceChange,
  onLineConversion,
  isStreaming = false,
  isConnecting = false,
}: NewDiagnosisModalProps) {
  const [isDetailedAnalysisExpanded, setIsDetailedAnalysisExpanded] = useState(false);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="relative w-full max-w-2xl max-h-[95vh] bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-blue-600/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 pointer-events-none"></div>

        <div className="relative sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between border-b border-blue-500/30 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base md:text-xl font-bold text-white">AI診断完了</h2>
              <p className="text-[10px] sm:text-xs text-blue-100 hidden sm:block">モメンタム分析・リアルタイムデータ・AIロジック</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="閉じる"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] px-3 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-4">
          <div className="relative bg-gradient-to-br from-slate-800/60 to-blue-900/60 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border border-cyan-600/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative space-y-3 sm:space-y-4">
              <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-blue-700/30 backdrop-blur-sm">
                {isConnecting ? (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent mb-2"></div>
                    <p className="text-cyan-300 font-semibold text-sm">AIサーバーに接続中...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="whitespace-pre-wrap text-blue-100 leading-relaxed text-xs sm:text-sm">
                      {parsedContent.summary}
                      {isStreaming && !parsedContent.hasDetailedAnalysis && (
                        <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-1"></span>
                      )}
                    </div>

                    {parsedContent.hasDetailedAnalysis && (
                      <div className="border-t border-blue-600/30 pt-3">
                        <button
                          onClick={() => setIsDetailedAnalysisExpanded(!isDetailedAnalysisExpanded)}
                          className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 rounded-lg transition-all border border-cyan-600/30 group"
                        >
                          <span className="text-cyan-300 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                            <span className="text-cyan-400">📊</span>
                            {isDetailedAnalysisExpanded ? '5分以内にあなたの専用レポートをお受け取りください。受け取らない場合、レポートは無効になる可能性があります。'
                              : ''}
                            {isStreaming && (
                              <span className="text-[10px] sm:text-xs text-blue-300">(生成中...)</span>
                            )}
                          </span>
                          {isDetailedAnalysisExpanded ? (
                            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:transform group-hover:scale-110 transition-transform" />
                          ) : (
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:transform group-hover:scale-110 transition-transform" />
                          )}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isDetailedAnalysisExpanded ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/50 p-3 sm:p-4 rounded-lg border border-cyan-600/20">
                            <div className="whitespace-pre-wrap text-blue-200 leading-relaxed text-xs sm:text-sm">
                              {parsedContent.detailedAnalysis}
                              {isStreaming && isDetailedAnalysisExpanded && (
                                <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse ml-1"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm md:text-base text-center text-cyan-300 font-semibold leading-relaxed">
                この銘柄の重要サポートライン変化を、LINEでリアルタイムにお知らせ！
              </p>
              <button
                onClick={onLineConversion}
                className="w-full bg-gradient-to-r from-[#06C755] to-[#05b04b] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-[#05b04b] hover:to-[#049c42] transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                無料AIレポートをLINEで受け取る
              </button>
            </div>
          </div>

        </div>

        <div className="relative sticky bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent px-3 py-3 sm:px-5 sm:py-4 border-t border-blue-800/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-600/30">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-green-300 leading-relaxed">
              毎日LINEで重要な株価のサポートラインが突破された情報を更新しています
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
