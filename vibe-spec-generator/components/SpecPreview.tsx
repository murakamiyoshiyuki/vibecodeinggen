'use client';

import { FormData } from '@/types/form';
import { ChevronLeft, Download, FileText, Copy } from 'lucide-react';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';

interface SpecPreviewProps {
  data: FormData;
  onPrev: () => void;
}

export default function SpecPreview({ data, onPrev }: SpecPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const getFeatureName = (featureId: string) => {
    const featureMap: Record<string, string> = {
      responsive: 'レスポンシブ対応',
      seo: 'SEO対策',
      analytics: 'アクセス解析',
      contact: 'お問い合わせフォーム',
      blog: 'ブログ機能',
      gallery: 'ギャラリー',
      news: 'お知らせ機能',
      faq: 'FAQ',
      sns: 'SNS連携',
      chat: 'チャット機能',
      review: 'レビュー機能',
      member: '会員機能',
      ec: 'EC機能',
      reservation: '予約システム',
      multilang: '多言語対応',
      api: '外部API連携',
    };
    return featureMap[featureId] || featureId;
  };

  const getPageName = (pageId: string) => {
    const pageMap: Record<string, string> = {
      hero: 'ヒーローセクション',
      features: '特徴・メリット',
      problem: '課題提起',
      solution: '解決策',
      testimonial: 'お客様の声',
      price: '料金',
      cta: 'CTA',
      faq: 'FAQ',
      home: 'トップページ',
      about: '会社概要',
      service: 'サービス',
      works: '実績',
      contact: 'お問い合わせ',
      blog: 'ブログ',
      recruit: '採用情報',
      top: 'トップページ',
      category: 'カテゴリー',
      product: '商品詳細',
      cart: 'カート',
      checkout: '購入手続き',
      mypage: 'マイページ',
      guide: 'ご利用ガイド',
    };
    return pageMap[pageId] || pageId;
  };

  const getDesignStyleName = (style: string) => {
    const styleMap: Record<string, string> = {
      modern: 'モダン',
      business: 'ビジネス',
      creative: 'クリエイティブ',
      elegant: 'エレガント',
      playful: 'ポップ',
      tech: 'テック',
    };
    return styleMap[style] || style;
  };

  const getColorSchemeName = (scheme: string) => {
    const schemeMap: Record<string, string> = {
      blue: 'ブルー系',
      green: 'グリーン系',
      purple: 'パープル系',
      red: 'レッド系',
      mono: 'モノクロ',
      warm: '暖色系',
    };
    return schemeMap[scheme] || scheme;
  };

  const getAnimationName = (animation: string) => {
    const animationMap: Record<string, string> = {
      none: 'アニメーションなし',
      minimal: '最小限のアニメーション',
      smooth: 'スムーズなアニメーション',
      dynamic: 'ダイナミックなアニメーション',
      interactive: 'インタラクティブな動き',
    };
    return animationMap[animation] || animation;
  };

  const generatePrompt = () => {
    const projectType = data.projectType === 'lp' ? 'ランディングページ' : 
                       data.projectType === 'hp' ? 'ホームページ' : 'ECサイト';
    
    return `以下の要件で${projectType}を作成してください。

## プロジェクト概要
- プロジェクト名: ${data.projectName}
- ターゲット顧客: ${data.targetAudience}
- サイトの目的: ${data.purpose}
- トーン・雰囲気: ${data.tone}

## デザイン要件
- デザインスタイル: ${getDesignStyleName(data.designStyle)}
- カラースキーム: ${getColorSchemeName(data.colorScheme)}
- アニメーション: ${getAnimationName(data.animations)}
- 画像・ビジュアル: ${data.images}

## コンテンツ要件
- コピーライティング: ${data.copywriting}
- 必要なページ/セクション:
${data.pages.map(p => `  - ${getPageName(p)}`).join('\n')}

## 機能要件
${data.features.map(f => `- ${getFeatureName(f)}`).join('\n')}

## 技術要件
- レスポンシブデザイン対応（スマホ・タブレット・PC）
- モダンなフレームワーク（React/Next.js推奨）
- 高速なページ読み込み
- SEO最適化

${data.additionalInfo ? `## その他の要望\n${data.additionalInfo}` : ''}

## 実装方針
1. 上記の要件を満たすウェブサイトを作成してください
2. コードは再利用可能でメンテナンスしやすい構造にしてください
3. ユーザビリティとアクセシビリティに配慮してください
4. パフォーマンスを重視し、最適化を行ってください`;
  };

  const prompt = generatePrompt();

  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.height;
      const pageWidth = pdf.internal.pageSize.width;
      const margin = 20;
      const lineHeight = 7;
      let yPosition = margin;

      // フォントの設定
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);

      // タイトル
      pdf.setFontSize(18);
      pdf.text('VIBE CODING Prompt', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += lineHeight * 2;

      // プロンプト内容を行ごとに分割
      pdf.setFontSize(10);
      const lines = prompt.split('\n');
      
      for (const line of lines) {
        // 長い行を折り返し
        const splitLines = pdf.splitTextToSize(line, pageWidth - margin * 2);
        
        for (const splitLine of splitLines) {
          if (yPosition + lineHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.text(splitLine, margin, yPosition);
          yPosition += lineHeight;
        }
      }

      pdf.save(`${data.projectName}_vibe_coding_prompt.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('PDF生成中にエラーが発生しました。テキストダウンロードをご利用ください。');
    }
  };

  const downloadText = () => {
    const content = `VIBE CODING プロンプト
生成日: ${new Date().toLocaleDateString('ja-JP')}

${prompt}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.projectName}_vibe_coding_prompt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">AIプロンプトの確認</h2>
      
      <div ref={previewRef} className="space-y-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">生成されたプロンプト</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-white p-4 rounded border border-gray-200">
            {prompt}
          </pre>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>戻る</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={copyToClipboard}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <Copy size={20} />
            <span>{copied ? 'コピーしました！' : 'クリップボードにコピー'}</span>
          </button>
          <button
            onClick={downloadText}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <FileText size={20} />
            <span>テキストでダウンロード</span>
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download size={20} />
            <span>PDFでダウンロード</span>
          </button>
        </div>
      </div>
    </div>
  );
}