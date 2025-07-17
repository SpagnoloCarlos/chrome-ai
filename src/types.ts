declare global {
  interface Window {
    Translator: Translator;
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
