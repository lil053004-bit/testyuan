import { Link } from 'react-router-dom';
import { Shield, Scale, FileText, Mail, ExternalLink, Info, Phone, Building } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-gradient-to-b from-dark-secondary to-dark-card border-t-2 border-accent-red/30 mt-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Legal Disclosure Section - Desktop */}
        <div className="hidden md:block bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6 text-amber-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                金融商品取引法に基づく重要事項
              </h3>

              <div className="bg-slate-100 rounded p-3">
                <p className="font-bold text-slate-900 mb-1">【登録情報】</p>
                <p className="text-xs text-slate-700">
                  当サービス提供者は金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
                  金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="border-t-2 border-gray-700 pt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {/* Legal Documents */}
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                法的文書
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/terms"
                    className="text-accent-red hover:text-red-400 hover:underline flex items-center gap-1"
                  >
                    利用規約 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    プライバシーポリシー <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    免責事項 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/risk-disclosure"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    リスク開示書面 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specified-commercial-transaction-act"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    特定商取引法表記 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-gray-100 mb-3 flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                お問い合わせ
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    お問い合わせフォーム <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    よくある質問 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    サポート <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li className="flex items-center gap-1 text-gray-300">
                  <Phone className="w-3 h-3" />
                  <span>平日 9:00-18:00</span>
                </li>
              </ul>
            </div>

            {/* Service Information */}
            <div>
              <h4 className="font-bold text-gray-100 mb-3 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4" />
                サービス情報
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>AI株式診断サービス</li>
                <li>リアルタイム株価情報</li>
                <li>テクニカル分析</li>
                <li>銘柄スクリーニング</li>
                <li>データ提供: 公開市場情報</li>
                <li>更新頻度: 準リアルタイム</li>
              </ul>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="font-bold text-gray-100 mb-3 flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" />
                運営会社
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    会社概要 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    チーム紹介 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    採用情報 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    プレスリリース <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-400 mb-2 font-medium">
              &copy; {currentYear} AI株式診断サービス. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
              当サイトで提供される情報は投資勧誘を目的としたものではありません。
              投資に関する最終決定は、利用者ご自身の判断でなさるようお願いいたします。
              掲載されている情報の正確性については万全を期しておりますが、その内容の正確性、安全性、有用性を保証するものではありません。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
