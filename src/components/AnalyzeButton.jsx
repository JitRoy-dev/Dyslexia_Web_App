const AnalyzeButton = ({ onClick, loading, coldStart = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative mt-5 w-full p-[clamp(14px,2.5vw,17px)] border-none rounded-[clamp(12px,2vw,16px)] text-white text-[clamp(14px,2.5vw,16px)] font-bold cursor-pointer tracking-wide overflow-hidden transition-all duration-300 group ${
        loading 
          ? 'bg-[#667eea]/40 shadow-none cursor-not-allowed transform-none' 
          : 'bg-gradient-to-br from-[#667eea] to-[#764ba2] shadow-[0_4px_20px_rgba(102,126,234,0.25)] hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(102,126,234,0.45)] active:translate-y-0 active:scale-[0.99] active:shadow-[0_4px_16px_rgba(102,126,234,0.3)]'
      }`}
    >
      <div className={`absolute top-0 -left-[100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transition-[left] duration-500 ${!loading && 'group-hover:left-[160%]'}`}></div>
      
      {loading ? (
        <span className="flex items-center justify-center gap-2.5">
          <span className="inline-block w-[18px] h-[18px] rounded-full border-[2.5px] border-white/25 border-t-white animate-spin shrink-0" />
          {coldStart ? 'Starting server...' : 'Analyzing handwriting...'}
        </span>
      ) : (
        "🔬 Analyze Handwriting"
      )}
    </button>
  );
};

export default AnalyzeButton;
