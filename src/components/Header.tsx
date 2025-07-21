import { Chrome, Moon, Sparkles, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("dark");

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("body")?.classList.toggle("dark");
  };

  return (
    <header className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <Chrome className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chrome 138</h1>
              <p className="text-sm text-muted-foreground">
                Prueba las Nuevas Funciones de IA
              </p>
            </div>
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>

          <div className="flex items-center space-x-3">
            <Sun
              className={`h-4 w-4 transition-colors ${
                theme === "light" ? "text-yellow-500" : "text-muted-foreground"
              }`}
            />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeChange}
              aria-label="Toggle theme"
              className="data-[state=checked]:bg-blue-600"
            />
            <Moon
              className={`h-4 w-4 transition-colors ${
                theme === "dark" ? "text-blue-400" : "text-muted-foreground"
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
