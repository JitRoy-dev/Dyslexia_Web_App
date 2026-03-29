import CheckIcon from './icons/CheckIcon';
import AlertIcon from './icons/AlertIcon';

const AnalysisResult = ({ result, preview, onReset }) => {
  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex flex-wrap gap-[clamp(20px,4vw,32px)] items-start max-[480px]:flex-col max-[480px]:items-center">
        {/* Analyzed Image */}
        <img 
          src={preview} 
          alt="analyzed" 
          className="w-[clamp(150px,28vw,210px)] h-[clamp(150px,28vw,210px)] max-[480px]:w-full max-[480px]:max-w-[280px] max-[480px]:h-auto max-[480px]:aspect-square object-cover rounded-[18px] border border-white/10 shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" 
        />
        
        {/* Result Details */}
        <div className="flex-1 min-w-0 max-[480px]:w-full max-[480px]:flex-none">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2.5 mb-5 px-[clamp(16px,3vw,22px)] py-[clamp(10px,1.5vw,12px)] rounded-full font-bold text-[clamp(14px,2.5vw,17px)] tracking-tight ${
            result.hasDyslexia 
              ? 'bg-red-500/10 border border-red-500/30 text-red-400 shadow-[0_0_24px_rgba(239,68,68,0.1)]' 
              : 'bg-green-500/10 border border-green-500/30 text-green-400 shadow-[0_0_24px_rgba(34,197,94,0.1)]'
          }`}>
            <span className="flex items-center shrink-0">
              {result.hasDyslexia ? <AlertIcon /> : <CheckIcon />}
            </span>
            <span>
              {result.hasDyslexia ? "Dyslexia Indicators Found" : "No Dyslexia Detected"}
            </span>
          </div>

          {/* Confidence Score */}
          <p className="m-0 mb-2 text-white/40 text-[clamp(10px,1.8vw,11px)] font-semibold uppercase tracking-[0.8px]">
            Confidence Score
          </p>
          <div className="flex items-center gap-[clamp(10px,2vw,14px)] mb-6">
            <div className="flex-1 h-2.5 min-w-0 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`relative h-full rounded-full transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                  result.hasDyslexia ? 'bg-gradient-to-r from-red-300 to-red-500' : 'bg-gradient-to-r from-green-300 to-green-500'
                }`}
                style={{ width: `${(result.confidence * 100).toFixed(0)}%` }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-bar"></div>
              </div>
            </div>
            <span className={`shrink-0 font-extrabold text-[clamp(17px,2.5vw,20px)] tracking-[-0.5px] ${result.hasDyslexia ? 'text-red-400' : 'text-green-400'}`}>
              {(result.confidence * 100).toFixed(1)}%
            </span>
          </div>

          {/* Markers */}
          <p className="m-0 mb-2 text-white/40 text-[clamp(10px,1.8vw,11px)] font-semibold uppercase tracking-[0.8px]">
            Analysis Markers
          </p>
          <div className="flex flex-wrap gap-2">
            {result.markers.map((m, i) => (
              <span 
                key={i} 
                className={`px-3.5 py-1.5 rounded-full text-[clamp(11px,1.8vw,12px)] font-semibold tracking-[0.1px] transition-transform hover:-translate-y-0.5 ${
                  result.hasDyslexia 
                    ? 'bg-red-500/10 border border-red-500/20 text-red-300' 
                    : 'bg-green-500/10 border border-green-500/20 text-green-300'
                }`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {result.hasDyslexia && (
        <div className="flex items-start gap-2.5 mt-6 px-[clamp(14px,3vw,20px)] py-[clamp(12px,2vw,16px)] rounded-2xl bg-amber-400/5 border border-amber-400/20 text-amber-300 text-[clamp(12px,2vw,13px)] leading-[1.6]">
          ⚠️ <span><strong className="text-amber-200">Note:</strong> This is a screening tool and not a clinical diagnosis. Please consult a licensed specialist for a comprehensive evaluation.</span>
        </div>
      )}

      {/* Reset Button */}
      <button 
        onClick={onReset} 
        className="group relative overflow-hidden mt-5 w-full p-[clamp(12px,2vw,15px)] rounded-xl border border-white/10 bg-white/5 text-white/70 font-semibold text-[clamp(13px,2vw,14px)] tracking-[0.1px] cursor-pointer transition-all duration-250 hover:border-[#667eea]/30 hover:text-white hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] active:translate-y-0"
      >
        <span className="relative z-10">↩ Analyze Another Sample</span>
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 opacity-0 transition-opacity duration-250 group-hover:opacity-100"></div>
      </button>
    </div>
  );
};

export default AnalysisResult;
