import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    '基本情報',
    'デザイン選択',
    '機能選択',
    'コンテンツ詳細',
    '確認・ダウンロード'
  ];

  return (
    <div className="flex justify-center items-center space-x-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isCurrent ? 'bg-blue-500 text-white' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-gray-300 text-gray-600' : ''}
                `}
              >
                {isCompleted ? <Check size={20} /> : stepNumber}
              </div>
              <span className={`mt-2 text-xs ${isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-20 h-1 mx-2 ${
                  stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}