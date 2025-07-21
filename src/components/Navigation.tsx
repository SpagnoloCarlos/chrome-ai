import { FileText, Languages, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Traductor from "./Traductor";
import Detector from "./Detector";
import Summarizer from "./Summarizer";

const Navigation = () => {
  return (
    <Tabs defaultValue="translator" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 bg-background shadow-sm">
        <TabsTrigger
          value="translator"
          className="flex items-center gap-0 md:gap-1.5 space-x-2"
        >
          <Languages className="h-4 w-4" />
          <span>Traductor</span>
        </TabsTrigger>
        <TabsTrigger
          value="detector"
          className="flex items-center gap-0 md:gap-1.5 space-x-2"
        >
          <Zap className="h-4 w-4" />
          <span>Detector</span>
        </TabsTrigger>
        <TabsTrigger
          value="summarizer"
          className="flex items-center gap-0 md:gap-1.5 space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Resumir</span>
        </TabsTrigger>
      </TabsList>

      {/* Traductor */}
      <TabsContent value="translator">
        <Traductor />
      </TabsContent>

      {/* Detector */}
      <TabsContent value="detector">
        <Detector />
      </TabsContent>

      {/* Summarizer */}
      <TabsContent value="summarizer">
        <Summarizer />
      </TabsContent>
    </Tabs>
  );
};

export default Navigation;
