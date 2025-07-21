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
import { exampleTexts, languages } from "@/lib/constants";
import { toast } from "sonner";

const Detector = () => {
  const [detectorText, setDetectorText] = useState("");
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [detectorLoading, setDetectorLoading] = useState(false);

  const handleDetectLanguage = async () => {
    if (!detectorText.trim()) return;

    setDetectorLoading(true);
    try {
      const detector = await window?.LanguageDetector.create({
        expectedInputLanguage: languages.map(({ code }) => code),
      });

      const res = await detector.detect(detectorText);
      const detectedLang = res[0];
      const language =
        languages.find((l) => l.code === detectedLang.detectedLanguage)?.name ||
        detectedLang.detectedLanguage;
      const confidence = Math.floor(detectedLang.confidence * 100);
      const alternatives = res.slice(1).map((lang) => ({
        language:
          languages.find((l) => l.code === lang.detectedLanguage)?.name ||
          lang.detectedLanguage,
        confidence: Math.round(lang.confidence * 100),
      }));

      const result = {
        language,
        confidence,
        alternatives,
      };

      setDetectionResult(result);
    } catch (error) {
      toast("Error al detectar el idioma");
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
          <Card className="bg-background border-green-800">
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
