import { FormData } from '@/types/form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeatureSelectionProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const features = {
  basic: [
    { id: 'responsive', name: 'レスポンシブ対応', description: 'スマホ・タブレット対応' },
    { id: 'seo-basic', name: '基本的な検索エンジン対策（SEO対策）', description: 'Googleなどで見つかりやすくする基本設定' },
    { id: 'seo-title', name: 'ページタイトルの最適化（SEO対策）', description: '検索結果に表示される見出しを効果的に設定' },
    { id: 'seo-meta', name: '説明文の最適化（SEO対策）', description: '検索結果に表示される説明文を魅力的に設定' },
    { id: 'analytics', name: 'アクセス解析', description: 'Google Analytics設置' },
    { id: 'contact', name: 'お問い合わせフォーム', description: 'メール送信機能付き' },
  ],
  content: [
    { id: 'blog', name: 'ブログ機能', description: '記事投稿・管理機能' },
    { id: 'gallery', name: 'ギャラリー', description: '画像・動画表示' },
    { id: 'news', name: 'お知らせ機能', description: '新着情報の配信' },
    { id: 'faq', name: 'FAQ', description: 'よくある質問' },
  ],
  social: [
    { id: 'sns', name: 'SNS連携', description: 'シェアボタン設置' },
    { id: 'chat', name: 'チャット機能', description: 'リアルタイムサポート' },
    { id: 'review', name: 'レビュー機能', description: 'お客様の声' },
    { id: 'member', name: '会員機能', description: 'ログイン・マイページ' },
  ],
  advanced: [
    { id: 'ec', name: 'EC機能', description: 'オンライン決済' },
    { id: 'reservation', name: '予約システム', description: 'カレンダー予約' },
    { id: 'multilang', name: '多言語対応', description: '複数言語切り替え' },
    { id: 'api', name: '外部API連携', description: '他サービスとの連携' },
    { id: 'llm-chatbot', name: 'AI対話システム（LLM対策）', description: 'ChatGPTのような自動応答機能' },
    { id: 'llm-content', name: 'AI用コンテンツ最適化（LLM対策）', description: 'AIが理解しやすい情報構造にする' },
    { id: 'llm-structured', name: '構造化データ対応（LLM対策）', description: 'AIが情報を読み取りやすくする設定' },
  ]
};

export default function FeatureSelection({ data, updateData, onNext, onPrev }: FeatureSelectionProps) {
  const handleFeatureToggle = (featureId: string) => {
    const currentFeatures = data.features || [];
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(f => f !== featureId)
      : [...currentFeatures, featureId];
    updateData({ features: newFeatures });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">必要な機能の選択</h2>
      
      <div className="space-y-8">
        {Object.entries(features).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 capitalize">
              {category === 'basic' && '基本機能'}
              {category === 'content' && 'コンテンツ機能'}
              {category === 'social' && 'ソーシャル機能'}
              {category === 'advanced' && '高度な機能'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((feature) => (
                <label
                  key={feature.id}
                  className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    data.features.includes(feature.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.features.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-semibold">{feature.name}</div>
                    <div className="text-sm text-gray-600">{feature.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            その他の要望（任意）
          </label>
          <textarea
            value={data.additionalInfo || ''}
            onChange={(e) => updateData({ additionalInfo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="特別な要望や追加機能があれば記入してください"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>戻る</span>
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span>確認画面へ</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </form>
  );
}