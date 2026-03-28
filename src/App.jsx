import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadZone from "./components/UploadZone";
import AnalyzeButton from "./components/AnalyzeButton";
import AnalysisResult from "./components/AnalysisResult";
import Features from "./components/Features";
import Chatbot from "./components/Chatbot";
import { predictDyslexia, NetworkError, TimeoutError, ServerError } from "./services/apiService";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [coldStartDetected, setColdStartDetected] = useState(false);

  const handleFileSelect = (file) => {
    setImage(file);
    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setColdStartDetected(false);

    try {
      const apiResult = await predictDyslexia(image, () => {
        setColdStartDetected(true);
      });

      const markers = apiResult.hasDyslexia
        ? ["Irregular letter spacing", "Letter reversals detected", "Inconsistent baseline", "Mixed letter sizes"]
        : ["Consistent letter formation", "Regular spacing", "Stable baseline", "Uniform sizing"];

      setResult({
        hasDyslexia: apiResult.hasDyslexia,
        confidence: apiResult.confidence,
        label: apiResult.label,
        markers: markers,
      });
    } catch (err) {
      console.error('Analysis error:', err);

      if (err instanceof NetworkError) {
        setError('No internet connection. Please check your network and try again.');
      } else if (err instanceof TimeoutError) {
        setError('Request timed out. The server might be starting up. Please try again.');
      } else if (err instanceof ServerError) {
        setError('Server error. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
      setColdStartDetected(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="app-bg pb-12">
      <div className="app-orb-1"></div>
      <div className="app-orb-2"></div>
      <Header />
      <main className="relative z-10 w-full max-w-[960px] mx-auto pt-[clamp(120px,14vw,140px)] p-[clamp(24px,6vw,48px)_clamp(16px,4vw,28px)] max-[640px]:pt-[100px] max-[640px]:p-[20px_14px]">
        <Hero />

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[clamp(20px,3vw,28px)] p-[clamp(24px,4vw,36px)] max-[640px]:p-[20px_16px] mb-[clamp(24px,4vw,36px)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_28px_72px_rgba(0,0,0,0.35)]">
          {!result ? (
            <>
              <UploadZone
                onFileSelect={handleFileSelect}
                preview={preview}
                onReset={reset}
              />

              {error && (
                <div className="mt-4 p-[clamp(12px,2vw,14px)_clamp(14px,3vw,18px)] bg-red-500/10 border border-red-500/25 rounded-2xl text-[clamp(13px,2vw,14px)] text-red-300 leading-relaxed flex items-center gap-2.5 animate-fade-in-down">
                  ⚠️ {error}
                </div>
              )}

              {coldStartDetected && (
                <div className="mt-4 p-[clamp(12px,2vw,14px)_clamp(14px,3vw,18px)] bg-blue-500/10 border border-blue-500/25 rounded-2xl text-[clamp(13px,2vw,14px)] text-blue-300 leading-relaxed flex items-center gap-2.5 animate-pulse">
                  ⏳ Server is starting up, this may take a moment...
                </div>
              )}

              {image && (
                <AnalyzeButton
                  onClick={analyze}
                  loading={loading}
                  coldStart={coldStartDetected}
                />
              )}
            </>
          ) : (
            <AnalysisResult
              result={result}
              preview={preview}
              onReset={reset}
            />
          )}
        </div>

        <Features />
      </main>
      <Chatbot />
    </div>
  );
}
