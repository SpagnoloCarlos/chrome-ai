import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { Copy, FileText, Loader2 } from "lucide-react";

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

const Summarizer = () => {
  const [summarizerText, setSummarizerText] = useState("");
  const [summaryLength, setSummaryLength] = useState([50]);
  const [summaryStyle, setSummaryStyle] = useState("paragraph");
  const [summaryResult, setSummaryResult] = useState("");
  const [summarizerLoading, setSummarizerLoading] = useState(false);

  const simulateTextSummary = async (
    text: string,
    length: number,
    style: string
  ): Promise<string> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000)
    );

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const targetLength = Math.max(
      1,
      Math.floor(sentences.length * (length / 100))
    );

    let summary = sentences.slice(0, targetLength).join(". ") + ".";

    if (style === "bullets") {
      const points = sentences
        .slice(0, targetLength)
        .map((s) => `• ${s.trim()}`);
      summary = points.join("\n");
    } else if (style === "keywords") {
      const keywords = [
        "AI",
        "machine learning",
        "technology",
        "artificial intelligence",
        "development",
        "future",
        "systems",
      ];
      summary = `Palabras clave: ${keywords
        .slice(0, 5)
        .join(", ")}\n\n${summary}`;
    }

    return summary;
  };

  const handleSummarize = async () => {
    if (!summarizerText.trim()) return;

    setSummarizerLoading(true);
    try {
      const result = await simulateTextSummary(
        summarizerText,
        summaryLength[0],
        summaryStyle
      );
      setSummaryResult(result);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Error al resumir el texto",
      //   variant: "destructive",
      // })
    }
    setSummarizerLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast({
    //   title: "Copiado",
    //   description: "Texto copiado al portapapeles",
    // })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-purple-600" />
          <span>Resumir Texto</span>
        </CardTitle>
        <CardDescription>
          Genera resúmenes inteligentes de textos largos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Texto a resumir</Label>
          <Textarea
            placeholder="Pega aquí el texto que quieres resumir..."
            value={summarizerText}
            onChange={(e) => setSummarizerText(e.target.value)}
            className="min-h-40"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSummarizerText(exampleTexts.summarizer)}
          >
            Usar texto de ejemplo
          </Button>
          <div className="text-sm text-gray-500">
            Palabras:{" "}
            {summarizerText.split(" ").filter((w) => w.length > 0).length}
          </div>
        </div>

        {/* Controles de resumen */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Longitud del resumen: {summaryLength[0]}%</Label>
              <Slider
                value={summaryLength}
                onValueChange={setSummaryLength}
                max={100}
                min={10}
                step={10}
                className="mt-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Estilo de resumen</Label>
            <RadioGroup value={summaryStyle} onValueChange={setSummaryStyle}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paragraph" id="paragraph" />
                <Label htmlFor="paragraph">Párrafo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bullets" id="bullets" />
                <Label htmlFor="bullets">Puntos clave</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="keywords" id="keywords" />
                <Label htmlFor="keywords">Con palabras clave</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {summaryResult && (
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">
                Resumen generado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="whitespace-pre-wrap text-purple-900">
                  {summaryResult}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-0 right-0 bg-transparent"
                  onClick={() => copyToClipboard(summaryResult)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex space-x-2">
          <Button
            onClick={handleSummarize}
            disabled={summarizerLoading || !summarizerText.trim()}
          >
            {summarizerLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Resumir Texto
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSummarizerText("");
              setSummaryResult("");
            }}
          >
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summarizer;
