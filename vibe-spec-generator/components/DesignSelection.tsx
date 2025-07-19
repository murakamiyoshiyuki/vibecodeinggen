import { FormData } from '@/types/form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DesignSelectionProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const designStyles = [
  { 
    id: 'modern', 
    name: 'モダン', 
    description: 'シンプルで洗練されたデザイン',
    preview: '🎨 クリーンでミニマル'
  },
  { 
    id: 'business', 
    name: 'ビジネス', 
    description: '信頼感のある企業向けデザイン',
    preview: '💼 プロフェッショナル'
  },
  { 
    id: 'creative', 
    name: 'クリエイティブ', 
    description: '個性的で印象的なデザイン',
    preview: '🎪 アーティスティック'
  },
  { 
    id: 'elegant', 
    name: 'エレガント', 
    description: '高級感のある上品なデザイン',
    preview: '💎 ラグジュアリー'
  },
  { 
    id: 'playful', 
    name: 'ポップ', 
    description: '楽しく親しみやすいデザイン',
    preview: '🎈 カジュアル'
  },
  { 
    id: 'tech', 
    name: 'テック', 
    description: '技術的で先進的なデザイン',
    preview: '🚀 フューチャリスティック'
  }
];

const colorSchemes = [
  { id: 'blue', name: 'ブルー系', colors: ['#1E40AF', '#3B82F6', '#93C5FD'] },
  { id: 'green', name: 'グリーン系', colors: ['#166534', '#16A34A', '#86EFAC'] },
  { id: 'purple', name: 'パープル系', colors: ['#6B21A8', '#9333EA', '#D8B4FE'] },
  { id: 'red', name: 'レッド系', colors: ['#991B1B', '#EF4444', '#FCA5A5'] },
  { id: 'mono', name: 'モノクロ', colors: ['#111827', '#6B7280', '#E5E7EB'] },
  { id: 'warm', name: '暖色系', colors: ['#F59E0B', '#FB923C', '#FED7AA'] }
];

const siteTones = [
  { 
    id: 'professional', 
    name: 'プロフェッショナル・洗練された', 
    description: '高級感・信頼感',
    icon: '🏢'
  },
  { 
    id: 'friendly', 
    name: 'フレンドリー・親しみやすい', 
    description: '温かみ・アットホーム',
    icon: '😊'
  },
  { 
    id: 'modern', 
    name: 'モダン・先進的', 
    description: '革新的・最先端',
    icon: '✨'
  },
  { 
    id: 'energetic', 
    name: 'エネルギッシュ・活発', 
    description: '躍動感・情熱的',
    icon: '🔥'
  },
  { 
    id: 'calm', 
    name: '落ち着いた・誠実', 
    description: '安心感・堅実',
    icon: '🌿'
  }
];

export default function DesignSelection({ data, updateData, onNext, onPrev }: DesignSelectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">デザインの選択</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">デザインスタイル</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {designStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => updateData({ designStyle: style.id })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.designStyle === style.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-2">{style.preview.split(' ')[0]}</div>
                <div className="font-semibold">{style.name}</div>
                <div className="text-xs text-gray-600 mt-1">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">カラースキーム</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                type="button"
                onClick={() => updateData({ colorScheme: scheme.id })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.colorScheme === scheme.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex space-x-1 mb-3 justify-center">
                  {scheme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="font-semibold text-sm">{scheme.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">サイトのトーン・雰囲気</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteTones.map((tone) => (
              <button
                key={tone.id}
                type="button"
                onClick={() => updateData({ tone: tone.id })}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  data.tone === tone.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-start">
                  <div className="text-2xl mr-3">{tone.icon}</div>
                  <div>
                    <div className="font-semibold">{tone.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{tone.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
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
          disabled={!data.designStyle || !data.colorScheme || !data.tone}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <span>次へ進む</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </form>
  );
}