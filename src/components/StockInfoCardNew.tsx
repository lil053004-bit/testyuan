import { StockInfo } from '../types/stock';

interface StockInfoCardNewProps {
  info: StockInfo;
  isPlaceholder?: boolean;
}

export default function StockInfoCardNew({ info, isPlaceholder = false }: StockInfoCardNewProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`bg-[#001a4d]/60 backdrop-blur-sm border rounded-lg overflow-hidden ${
        isPlaceholder ? 'border-red-500/50' : 'border-cyan-400/30'
      }`}>
        <div className="flex">
          <div className="flex-1 flex items-center justify-center border-r border-cyan-400/30 py-8 px-4">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                isPlaceholder ? 'text-gray-500' : 'text-white'
              }`}>{info.code}</div>
              <div className="flex items-center justify-center mt-4">
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 0L12 24M12 24L6 18M12 24L18 18" stroke="#ff4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-[2] py-4 px-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <div className="text-cyan-300 mb-1">始値</div>
                <div className={`font-semibold ${
                  isPlaceholder ? 'text-gray-500' : 'text-white'
                }`}>{info.price || '---'}</div>
              </div>
              <div className="text-center">
                <div className="text-cyan-300 mb-1">高値</div>
                <div className={`font-semibold ${
                  isPlaceholder ? 'text-gray-500' : 'text-white'
                }`}>{info.price || '---'}</div>
              </div>

              <div className="text-center border-t border-cyan-400/20 pt-3">
                <div className="text-cyan-300 mb-1">前日終値</div>
                <div className={`font-semibold ${
                  isPlaceholder ? 'text-gray-500' : 'text-white'
                }`}>{info.price || '---'}</div>
              </div>
              <div className="text-center border-t border-cyan-400/20 pt-3">
                <div className="text-cyan-300 mb-1">安値</div>
                <div className={`font-semibold ${
                  isPlaceholder ? 'text-gray-500' : 'text-white'
                }`}>{info.price || '---'}</div>
              </div>

              <div className="text-center border-t border-cyan-400/20 pt-3">
                <div className="text-cyan-300 mb-1">調整終値</div>
                <div className={`font-semibold ${
                  isPlaceholder ? 'text-gray-500' : 'text-white'
                }`}>---</div>
              </div>
              <div className="text-center border-t border-cyan-400/20 pt-3">
                <div className="text-cyan-300 mb-1">売買高</div>
                <div className={`font-semibold ${
                  isPlaceholder ? 'text-gray-500' : 'text-white'
                }`}>---</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
