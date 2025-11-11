import { AlertCircle } from 'lucide-react';

export default function RegistrationInfo() {
  return (
    <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-slate-600/50">
      <div className="bg-[#555e8d] px-6 py-4 flex items-center gap-3 border-b border-slate-500/30">
        <AlertCircle className="w-5 h-5 text-yellow-300" />
        <h3 className="text-lg font-bold text-white">登録情報</h3>
      </div>

      <div className="bg-[#555e8d]/80 backdrop-blur-sm px-6 py-5">
        <p className="text-sm text-slate-100 leading-relaxed">
          当サービス提供者は金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
          金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
        </p>
      </div>
    </div>
  );
}
