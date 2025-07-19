import { FormData } from '@/types/form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentDetailsFormProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const copywritingOptions = [
  { id: 'casual', name: '親しみやすい・カジュアル', description: 'フレンドリーな話し言葉調' },
  { id: 'professional', name: '専門的・信頼感重視', description: '丁寧な敬語調' },
  { id: 'motivational', name: '情熱的・モチベーショナル', description: '熱意のある語り口調' },
  { id: 'minimal', name: 'シンプル・ミニマル', description: '簡潔で要点のみ' },
  { id: 'story', name: 'ストーリー重視', description: '体験談や事例を交えた展開' }
];

const visualDirectionOptions = [
  { id: 'photo', name: '写真メイン', description: 'リアルな人物や風景写真' },
  { id: 'illustration', name: 'イラストメイン', description: '親しみやすいイラスト' },
  { id: 'icon', name: 'アイコン・図解メイン', description: '分かりやすい図解' },
  { id: 'minimal', name: 'ミニマル', description: '必要最小限のビジュアル' },
  { id: 'infographic', name: 'インフォグラフィック', description: 'データや情報を視覚化' }
];

const pageOptions = {
  lp: [
    { id: 'hero', name: 'ヒーローセクション', description: 'メインビジュアルとキャッチコピー' },
    { id: 'features', name: '特徴・メリット', description: '商品・サービスの特徴' },
    { id: 'problem', name: '課題提起', description: '顧客の悩みや問題' },
    { id: 'solution', name: '解決策', description: '提供する解決方法' },
    { id: 'testimonial', name: 'お客様の声', description: '実績・体験談' },
    { id: 'price', name: '料金', description: '価格表示' },
    { id: 'cta', name: 'CTA', description: '行動喚起ボタン' },
    { id: 'faq', name: 'FAQ', description: 'よくある質問' },
  ],
  hp: [
    { id: 'home', name: 'トップページ', description: 'メインページ' },
    { id: 'about', name: '会社概要', description: '企業情報' },
    { id: 'service', name: 'サービス', description: 'サービス一覧' },
    { id: 'works', name: '実績', description: '事例紹介' },
    { id: 'contact', name: 'お問い合わせ', description: 'コンタクトフォーム' },
    { id: 'blog', name: 'ブログ', description: 'お知らせ・記事' },
    { id: 'recruit', name: '採用情報', description: '求人情報' },
  ],
  ec: [
    { id: 'top', name: 'トップページ', description: 'メインページ' },
    { id: 'category', name: 'カテゴリー', description: '商品分類' },
    { id: 'product', name: '商品詳細', description: '個別商品ページ' },
    { id: 'cart', name: 'カート', description: '買い物かご' },
    { id: 'checkout', name: '購入手続き', description: '決済ページ' },
    { id: 'mypage', name: 'マイページ', description: '会員ページ' },
    { id: 'guide', name: 'ご利用ガイド', description: '使い方説明' },
  ]
};

export default function ContentDetailsForm({ data, updateData, onNext, onPrev }: ContentDetailsFormProps) {
  const handlePageToggle = (pageId: string) => {
    const currentPages = data.pages || [];
    const newPages = currentPages.includes(pageId)
      ? currentPages.filter(p => p !== pageId)
      : [...currentPages, pageId];
    updateData({ pages: newPages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const currentPageOptions = pageOptions[data.projectType] || pageOptions.lp;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">コンテンツの詳細設定</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">必要なページ・セクション</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPageOptions.map((page) => (
              <label
                key={page.id}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  data.pages.includes(page.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.pages.includes(page.id)}
                  onChange={() => handlePageToggle(page.id)}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-semibold">{page.name}</div>
                  <div className="text-sm text-gray-600">{page.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">コピーライティングの方向性</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copywritingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  data.copywriting === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="copywriting"
                  value={option.id}
                  checked={data.copywriting === option.id}
                  onChange={(e) => updateData({ copywriting: e.target.value })}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-semibold">{option.name}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">画像・ビジュアルの方向性</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visualDirectionOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  data.images === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="images"
                  value={option.id}
                  checked={data.images === option.id}
                  onChange={(e) => updateData({ images: e.target.value })}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-semibold">{option.name}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            アニメーション・動きの要望
          </label>
          <select
            value={data.animations}
            onChange={(e) => updateData({ animations: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">選択してください</option>
            <option value="none">アニメーションなし</option>
            <option value="minimal">最小限のアニメーション</option>
            <option value="smooth">スムーズなアニメーション</option>
            <option value="dynamic">ダイナミックなアニメーション</option>
            <option value="interactive">インタラクティブな動き</option>
          </select>
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