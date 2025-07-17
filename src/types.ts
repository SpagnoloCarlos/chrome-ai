declare global {
  interface Window {
    Translator: Translator;
    LanguageDetector: Detector;
  }
}

interface Translator {
  create(options: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<TranslatorInstance>;
}

interface TranslatorInstance {
  translate(text: string): Promise<string>;
}

interface Detector {
  create(options: {
    expectedInputLanguage: string[];
  }): Promise<DetectorInstance>;
}

interface DetectorInstance {
  detect(text: string): Promise<Array<DetectedLanguages>>;
}

interface DetectedLanguages {
  detectedLanguage: string;
  confidence: number;
}
