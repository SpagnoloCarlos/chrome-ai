import { Loader2, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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

const Detector = () => {
  const [detectorText, setDetectorText] = useState("");
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [detectorLoading, setDetectorLoading] = useState(false);

  const simulateLanguageDetection = async (text: string) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 700)
    );

    const patterns = {
      en: /\b(the|and|is|in|to|of|a|that|it|with|for|as|was|on|are|you)\b/gi,
      es: /\b(el|la|de|que|y|en|un|es|se|no|te|lo|le|da|su|por|son|con|para|al|una)\b/gi,
      fr: /\b(le|de|et|à|un|il|être|et|en|avoir|que|pour|dans|ce|son|une|sur|avec|ne|se)\b/gi,
      de: /\b(der|die|und|in|den|von|zu|das|mit|sich|des|auf|für|ist|im|dem|nicht|ein|eine)\b/gi,
      it: /\b(il|di|che|e|la|per|in|un|è|da|non|a|sono|come|più|lo|tutto|ma|se|nel)\b/gi,
      pt: /\b(o|de|a|e|do|da|em|um|para|com|não|uma|os|no|se|na|por|mais|as|dos)\b/gi,
      ja: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g,
      ko: /[\uAC00-\uD7AF]/g,
      zh: /[\u4E00-\u9FFF]/g,
      ru: /[\u0400-\u04FF]/g,
    };

    const scores: { [key: string]: number } = {};

    for (const [lang, pattern] of Object.entries(patterns)) {
      const matches = text.match(pattern);
      scores[lang] = matches ? matches.length : 0;
    }

    const totalMatches = Object.values(scores).reduce((a, b) => a + b, 0);
    const detectedLang = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];
    const confidence =
      totalMatches > 0
        ? Math.min(
            95,
            (scores[detectedLang] / totalMatches) * 100 + Math.random() * 20
          )
        : 50 + Math.random() * 30;

    const langName =
      languages.find((l) => l.code === detectedLang)?.name || "Unknown";

    return {
      language: langName,
      confidence: Math.round(confidence),
      alternatives: Object.entries(scores)
        .filter(([lang]) => lang !== detectedLang && scores[lang] > 0)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([lang]) => ({
          language: languages.find((l) => l.code === lang)?.name || lang,
          confidence: Math.round(Math.random() * 30 + 10),
        })),
    };
  };

  const handleDetectLanguage = async () => {
    if (!detectorText.trim()) return;

    setDetectorLoading(true);
    try {
      const result = await simulateLanguageDetection(detectorText);
      setDetectionResult(result);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Error al detectar el idioma",
      //   variant: "destructive",
      // })
    }
    setDetectorLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-green-600" />
          <span>Detector de Idioma</span>
        </CardTitle>
        <CardDescription>
          Detecta automáticamente el idioma de cualquier texto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Texto a analizar</Label>
          <Textarea
            placeholder="Escribe o pega texto en cualquier idioma..."
            value={detectorText}
            onChange={(e) => setDetectorText(e.target.value)}
            className="min-h-32"
          />
          <div className="flex flex-wrap gap-2">
            {exampleTexts.detector.map((example, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => setDetectorText(example.text)}
              >
                {example.language}
              </Button>
            ))}
          </div>
        </div>

        {detectionResult && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-800">
                    Idioma detectado
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {detectionResult.confidence}% confianza
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {detectionResult.language}
                </div>
                {detectionResult.alternatives.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">
                      Alternativas:
                    </h4>
                    <div className="flex space-x-2">
                      {detectionResult.alternatives.map(
                        (alt: any, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-green-600"
                          >
                            {alt.language} ({alt.confidence}%)
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex space-x-2">
          <Button
            onClick={handleDetectLanguage}
            disabled={detectorLoading || !detectorText.trim()}
          >
            {detectorLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Detectar Idioma
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setDetectorText("");
              setDetectionResult(null);
            }}
          >
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Detector;
