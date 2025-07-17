export const languages = [
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

export const exampleTexts = {
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
