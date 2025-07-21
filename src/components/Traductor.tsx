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
import { toast } from "sonner";
import { exampleTexts, languages } from "@/lib/constants";

const Traductor = () => {
  const [translatorText, setTranslatorText] = useState("");
  const [translatorFrom, setTranslatorFrom] = useState("en");
  const [translatorTo, setTranslatorTo] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [translatorLoading, setTranslatorLoading] = useState(false);

  const handleTranslate = async () => {
    if (!translatorText.trim()) return;

    setTranslatorLoading(true);

    try {
      const translator = await window?.Translator.create({
        sourceLanguage: translatorFrom,
        targetLanguage: translatorTo,
      });

      const translation = await translator.translate(translatorText);
      setTranslatedText(translation);
    } catch (error) {
      toast("Error al traducir el texto");
    }
    setTranslatorLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Texto copiado al portapapeles");
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
                  <span className="hidden md:inline">{lang.flag}</span>{" "}
                  {lang.name}
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
                  <span className="hidden md:inline">{lang.flag}</span>{" "}
                  {lang.name}
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
