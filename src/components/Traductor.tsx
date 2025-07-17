import { ArrowLeftRight, Copy, Languages, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

const exampleTexts = {
  translator: [
    { text: "Hello, how are you today?", from: "en", to: "es" },
    { text: "Bonjour, comment allez-vous?", from: "fr", to: "en" },
    { text: "Gracias por tu ayuda", from: "es", to: "en" },
  ],
  detector: [
    { text: "Hello, this is a test in English", language: "English" },
    { text: "Bonjour, ceci est un test en français", language: "French" },
    { text: "Hola, esto es una prueba en español", language: "Spanish" },
    { text: "Guten Tag, das ist ein Test auf Deutsch", language: "German" },
    { text: "こんにちは、これは日本語のテストです", language: "Japanese" },
  ],
  summarizer: `Artificial Intelligence (AI) has become one of the most transformative technologies of the 21st century, revolutionizing industries from healthcare to transportation. Machine learning, a subset of AI, enables computers to learn and improve from experience without being explicitly programmed. Deep learning, which uses neural networks with multiple layers, has achieved remarkable breakthroughs in image recognition, natural language processing, and game playing. Companies like Google, Microsoft, and OpenAI are investing billions of dollars in AI research and development. The technology has applications in autonomous vehicles, medical diagnosis, financial trading, and personal assistants. However, AI also raises important ethical questions about job displacement, privacy, and the potential for bias in algorithmic decision-making. As AI continues to evolve, it's crucial for society to develop frameworks for responsible AI development and deployment. The future of AI promises even more sophisticated systems that could potentially achieve artificial general intelligence, though experts debate when this milestone might be reached. Regardless of the timeline, AI will undoubtedly continue to shape our world in profound ways.`,
};

const translations = {
  hello: {
    es: "hola",
    fr: "bonjour",
    de: "hallo",
    it: "ciao",
    pt: "olá",
    ja: "こんにちは",
    ko: "안녕하세요",
    zh: "你好",
    ru: "привет",
  },
  goodbye: {
    es: "adiós",
    fr: "au revoir",
    de: "auf wiedersehen",
    it: "ciao",
    pt: "tchau",
    ja: "さようなら",
    ko: "안녕히 가세요",
    zh: "再见",
    ru: "до свидания",
  },
  "thank you": {
    es: "gracias",
    fr: "merci",
    de: "danke",
    it: "grazie",
    pt: "obrigado",
    ja: "ありがとう",
    ko: "감사합니다",
    zh: "谢谢",
    ru: "спасибо",
  },
  "how are you": {
    es: "¿cómo estás?",
    fr: "comment allez-vous?",
    de: "wie geht es dir?",
    it: "come stai?",
    pt: "como você está?",
    ja: "元気ですか？",
    ko: "어떻게 지내세요?",
    zh: "你好吗？",
    ru: "как дела?",
  },
  "good morning": {
    es: "buenos días",
    fr: "bonjour",
    de: "guten morgen",
    it: "buongiorno",
    pt: "bom dia",
    ja: "おはよう",
    ko: "좋은 아침",
    zh: "早上好",
    ru: "доброе утро",
  },
};

const Traductor = () => {
  const [translatorText, setTranslatorText] = useState("");
  const [translatorFrom, setTranslatorFrom] = useState("en");
  const [translatorTo, setTranslatorTo] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [translatorLoading, setTranslatorLoading] = useState(false);

  const simulateTranslation = async (
    text: string,
    from: string,
    to: string
  ): Promise<string> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    const lowerText = text.toLowerCase();
    for (const [key, translations_obj] of Object.entries(translations)) {
      if (lowerText.includes(key)) {
        return (
          translations_obj[to as keyof typeof translations_obj] ||
          `[Traducido de ${from} a ${to}] ${text}`
        );
      }
    }

    return `[Traducido de ${from} a ${to}] ${text}`;
  };

  const handleTranslate = async () => {
    if (!translatorText.trim()) return;

    setTranslatorLoading(true);
    try {
      const result = await simulateTranslation(
        translatorText,
        translatorFrom,
        translatorTo
      );
      setTranslatedText(result);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Error al traducir el texto",
      //   variant: "destructive",
      // })
    }
    setTranslatorLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast({
    //   title: "Copiado",
    //   description: "Texto copiado al portapapeles",
    // })
  };

  const swapLanguages = () => {
    setTranslatorFrom(translatorTo);
    setTranslatorTo(translatorFrom);
    setTranslatorText(translatedText);
    setTranslatedText(translatorText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Languages className="h-5 w-5 text-blue-600" />
          <span>Traductor de Idiomas</span>
        </CardTitle>
        <CardDescription>
          Traduce texto entre diferentes idiomas con IA avanzada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controles de idioma */}
        <div className="flex items-center space-x-4">
          <Select value={translatorFrom} onValueChange={setTranslatorFrom}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={swapLanguages}>
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <Select value={translatorTo} onValueChange={setTranslatorTo}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Área de traducción */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Texto original</Label>
            <Textarea
              placeholder="Escribe o pega el texto a traducir..."
              value={translatorText}
              onChange={(e) => setTranslatorText(e.target.value)}
              className="min-h-32"
            />
            <div className="flex space-x-2">
              {exampleTexts.translator.map((example, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTranslatorText(example.text);
                    setTranslatorFrom(example.from);
                    setTranslatorTo(example.to);
                  }}
                >
                  Ejemplo {i + 1}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Traducción</Label>
            <div className="relative">
              <Textarea
                value={translatedText}
                readOnly
                className="min-h-32 bg-gray-50"
                placeholder="La traducción aparecerá aquí..."
              />
              {translatedText && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-transparent"
                  onClick={() => copyToClipboard(translatedText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleTranslate}
            disabled={translatorLoading || !translatorText.trim()}
          >
            {translatorLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Traducir
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setTranslatorText("");
              setTranslatedText("");
            }}
          >
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Traductor;
