const Hero = () => {
  return (
    <div className="relative text-center mb-[clamp(36px,6vw,56px)] pt-[clamp(8px,2vw,16px)]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[radial-gradient(ellipse,rgba(102,126,234,0.12)_0%,transparent_70%)] blur-[30px] pointer-events-none -z-10"></div>
      
      <div className="relative z-10 inline-flex items-center gap-2 mb-5 px-[18px] py-[7px] rounded-[30px] bg-[#667eea]/10 border border-[#667eea]/30 text-[#a78bfa] text-[clamp(11px,2vw,12px)] font-semibold uppercase tracking-[0.5px] animate-fade-in-down">
        <span className="text-xs">⚡</span> Powered by Deep Learning
      </div>
      
      <h2 className="relative z-10 m-0 mb-[18px] px-4 text-[clamp(28px,7vw,52px)] font-black leading-[1.15] tracking-[-1.5px] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e0d7ff] to-[#a78bfa] animate-fade-in-up [animation-delay:100ms]">
        Detect Dyslexia from<br />Handwritten Samples
      </h2>
      
      <p className="relative z-10 mx-auto max-w-[520px] px-4 m-0 text-[clamp(14px,2.5vw,17px)] text-white/55 leading-[1.65] font-normal animate-fade-in-up [animation-delay:200ms]">
        Upload a handwriting image and let our deep learning model analyze it for dyslexia indicators in seconds.
      </p>
    </div>
  );
};

export default Hero;
