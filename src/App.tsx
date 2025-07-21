import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import NotAvailable from "./components/NotAvailable";

function App() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    function checkChromeAvailability() {
      const ua = navigator.userAgent;
      const chromeMatch = ua.match(/Chrome\/(\d+)/);
      if (!chromeMatch) {
        setAvailable(false);
        return;
      }
      const version = parseInt(chromeMatch[1], 10);
      if (version >= 138) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }

    checkChromeAvailability();
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {available === null && (
          <div className="text-center min-h-[70dvh]">Cargando...</div>
        )}
        {available ? <Navigation /> : <NotAvailable />}
      </main>
      <Footer />
    </>
  );
}

export default App;
