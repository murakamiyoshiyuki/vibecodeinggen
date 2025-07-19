import { FormData } from '@/types/form';
import { ChevronRight } from 'lucide-react';

interface BasicInfoFormProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export default function BasicInfoForm({ data, updateData, onNext }: BasicInfoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">基本情報の入力</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            プロジェクト名
          </label>
          <input
            type="text"
            required
            value={data.projectName}
            onChange={(e) => updateData({ projectName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：新商品紹介ランディングページ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            サイトの種類
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'lp', label: 'LP（ランディングページ）', desc: '1ページ完結型' },
              { value: 'hp', label: 'HP（ホームページ）', desc: '複数ページの企業サイト' },
              { value: 'ec', label: 'ECサイト', desc: 'オンラインショップ' }
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => updateData({ projectType: type.value as 'lp' | 'hp' | 'ec' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.projectType === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">{type.label}</div>
                <div className="text-xs text-gray-600 mt-1">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ターゲット顧客
          </label>
          <input
            type="text"
            required
            value={data.targetAudience}
            onChange={(e) => updateData({ targetAudience: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：20-30代の女性、IT企業の経営者"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            サイトの目的
          </label>
          <textarea
            required
            value={data.purpose}
            onChange={(e) => updateData({ purpose: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="例：新商品の認知度向上と購入促進"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            サイトのトーン・雰囲気
          </label>
          <input
            type="text"
            required
            value={data.tone}
            onChange={(e) => updateData({ tone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：親しみやすく明るい、プロフェッショナルで信頼感のある"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>次へ進む</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </form>
  );
}