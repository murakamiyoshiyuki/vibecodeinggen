export interface FormData {
  projectName: string;
  projectType: 'lp' | 'hp' | 'ec';
  targetAudience: string;
  purpose: string;
  designStyle: string;
  colorScheme: string;
  features: string[];
  tone: string;
  pages: string[];
  copywriting: string;
  images: string;
  animations: string;
  additionalInfo?: string;
}