'use client';

import { useState } from 'react';
import BasicInfoForm from '@/components/BasicInfoForm';
import DesignSelection from '@/components/DesignSelection';
import FeatureSelection from '@/components/FeatureSelection';
import ContentDetailsForm from '@/components/ContentDetailsForm';
import SpecPreview from '@/components/SpecPreview';
import StepIndicator from '@/components/StepIndicator';
import { FormData } from '@/types/form';

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectType: 'lp',
    targetAudience: '',
    purpose: '',
    designStyle: '',
    colorScheme: '',
    features: [],
    tone: '',
    pages: [],
    copywriting: '',
    images: '',
    animations: '',
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          VIBE CODING プロンプトジェネレーター
        </h1>
        
        <StepIndicator currentStep={step} totalSteps={5} />

        <div className="mt-8 max-w-4xl mx-auto">
          {step === 1 && (
            <BasicInfoForm 
              data={formData} 
              updateData={updateFormData}
              onNext={nextStep}
            />
          )}
          
          {step === 2 && (
            <DesignSelection
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {step === 3 && (
            <FeatureSelection
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {step === 4 && (
            <ContentDetailsForm
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {step === 5 && (
            <SpecPreview
              data={formData}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </main>
  );
}
