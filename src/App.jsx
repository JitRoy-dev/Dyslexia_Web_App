import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadZone from "./components/UploadZone";
import AnalyzeButton from "./components/AnalyzeButton";
import AnalysisResult from "./components/AnalysisResult";
import Features from "./components/Features";
import { predictDyslexia, NetworkError, TimeoutError, ServerError } from "./services/apiService";
import "./App.css";

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
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />

        <div className="upload-card">
          {!result ? (
            <>
              <UploadZone
                onFileSelect={handleFileSelect}
                preview={preview}
                onReset={reset}
              />

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              {coldStartDetected && (
                <div className="cold-start-message">
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
    </div>
  );
}
