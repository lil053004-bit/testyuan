import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface NoticeCardProps {
  title: string;
  content: string;
  delay?: number;
}

function NoticeCard({ title, content, delay = 0 }: NoticeCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className="bg-navy-card/60 backdrop-blur-sm border border-yellow-warning/30 rounded-lg overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-yellow-warning/20 hover:bg-yellow-warning/30 transition-colors"
      >
        <AlertTriangle className="w-5 h-5 text-yellow-warning flex-shrink-0" />
        <span className="font-bold text-sm text-white text-left flex-1">{title}</span>
        <span className="text-yellow-warning text-lg">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <div className="px-4 py-3 border-t border-yellow-warning/20">
          <p className="text-xs text-gray-300 leading-relaxed">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

interface ComplianceNoticeProps {
  isHidden?: boolean;
}

export default function ComplianceNotice({ isHidden = false }: ComplianceNoticeProps) {
  const notices = [
    {
      title: '【サービスの性質】',
      content: '本サービスは、AI技術を活用した株式情報の提供および分析ツールです。投資助言業務、投資一任業務、金融商品仲介業務には該当せず、特定の金融商品の売買を推奨・勧誘するものではありません。',
    },
    {
      title: '【投資リスクに関する警告】',
      content: '株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、投資元本を割り込む可能性があります。過去の運用実績は将来の運用成果を保証するものではありません。市場環境の変化により、予想外の損失が発生する可能性があります。',
    },
    {
      title: '【情報の正確性について】',
      content: '提供される情報は、信頼できると判断した情報源から取得していますが、その正確性、完全性、適時性を保証するものではありません。AI分析結果は参考情報として提供されるものであり、絶対的な投資判断基準ではありません。',
    },
    {
      title: '【投資判断の責任】',
      content: '最終的な投資判断は、利用者ご自身の責任において行ってください。本サービスの利用により生じたいかなる損害についても、当社は一切の責任を負いません。投資を行う際は、証券会社等の金融商品取引業者にご相談ください。',
    },
  ];

  if (isHidden) {
    return null;
  }

  return (
    <div className="w-full bg-navy-dark/80 backdrop-blur-md border-t border-yellow-warning/20 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="space-y-3">
          {notices.map((notice, index) => (
            <NoticeCard
              key={index}
              title={notice.title}
              content={notice.content}
              delay={index * 50}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
