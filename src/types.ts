declare global {
  interface Window {
    Translator: Translator;
    LanguageDetector: Detector;
    Summarizer: Summarizer;
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

interface Summarizer {
  create(options: {
    type: string;
    length: string;
    format: string;
    sharedContext: string;
  }): Promise<SummarizerInstance>;
}

interface SummarizerInstance {
  summarize(text: string): Promise<string>;
}
