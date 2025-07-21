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
import { Textarea } from "./ui/textarea";
import { Copy, FileText, Loader2 } from "lucide-react";
import { exampleTexts } from "@/lib/constants";
import { toast } from "sonner";

const Summarizer = () => {
  const [summarizerText, setSummarizerText] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [summaryStyle, setSummaryStyle] = useState("teaser");
  const [summaryType, setSummaryType] = useState("plain-text");
  const [summaryResult, setSummaryResult] = useState("");
  const [summarizerLoading, setSummarizerLoading] = useState(false);
  const [summarizerContext, setSummarizerContext] = useState("");

  const handleSummarize = async () => {
    if (!summarizerText.trim()) return;

    setSummarizerLoading(true);
    try {
      const summarizer = await window?.Summarizer.create({
        type: summaryStyle,
        length: summaryLength,
        format: summaryType,
        sharedContext: summarizerContext.trim(),
      });

      const result = await summarizer.summarize(summarizerText);

      setSummaryResult(result);
    } catch (error) {
      toast("Error al resumir el texto");
    }
    setSummarizerLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Texto copiado al portapapeles");
  };

  const clearSummarizer = () => {
    setSummarizerText("");
    setSummaryResult("");
    setSummarizerContext("");
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
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Label>Longitud del resumen</Label>
            <RadioGroup value={summaryLength} onValueChange={setSummaryLength}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="short" />
                <Label htmlFor="short">Corto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="long" />
                <Label htmlFor="long">Largo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Estilo de resumen</Label>
            <RadioGroup value={summaryStyle} onValueChange={setSummaryStyle}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="headline" id="headline" />
                <Label htmlFor="headline">Titular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="key-points" id="key-points" />
                <Label htmlFor="key-points">Puntos clave</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teaser" id="teaser" />
                <Label htmlFor="teaser">Teaser</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tldr" id="tldr" />
                <Label htmlFor="tldr">Conciso</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Tipo de resumen</Label>
            <RadioGroup value={summaryType} onValueChange={setSummaryType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="plain-text" id="plain-text" />
                <Label htmlFor="plain-text">Texto plano</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="markdown" id="markdown" />
                <Label htmlFor="markdown">Markdown</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Contexto adicional (opcional)</Label>
          <Textarea
            placeholder="Proporciona contexto adicional para mejorar el resumen..."
            value={summarizerContext}
            onChange={(e) => setSummarizerContext(e.target.value)}
            className="min-h-20"
          />
        </div>

        {summaryResult && (
          <div className="space-y-2">
            <Card className="bg-background border-purple-800">
              <CardHeader className="relative">
                <CardTitle className="text-purple-800">
                  Resumen generado
                </CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-0 right-8 bg-transparent"
                  onClick={() => copyToClipboard(summaryResult)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="whitespace-pre-wrap text-purple-900">
                    {summaryResult}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="text-sm text-gray-500">
              Palabras:{" "}
              {summaryResult.split(" ").filter((w) => w.length > 0).length}
            </div>
          </div>
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
          <Button variant="outline" onClick={clearSummarizer}>
            Limpiar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summarizer;
