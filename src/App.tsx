import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navigation />
      </main>
      <Footer />
    </>
  );
}

export default App;
