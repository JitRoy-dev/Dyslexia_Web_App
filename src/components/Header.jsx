import BrainIcon from './icons/BrainIcon';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-wrap items-center justify-between gap-[clamp(10px,2vw,16px)] px-[clamp(16px,3vw,22px)] py-[clamp(20px,5vw,32px)] border-b border-white/10 backdrop-blur-xl bg-[#0a0818]/60 shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-[clamp(10px,2vw,14px)]">
        <div className="flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] shadow-[0_4px_16px_rgba(102,126,234,0.35)] transition-all duration-300 hover:-rotate-3 hover:scale-105">
          <BrainIcon />
        </div>
        <div className="flex flex-col">
          <h1 className="m-0 text-[clamp(16px,3vw,21px)] font-extrabold tracking-[-0.5px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4b5fd]">
            DyslexiaScan
          </h1>
          <p className="m-0 text-[clamp(10px,1.5vw,11px)] font-medium text-white/40 uppercase tracking-[0.5px]">
            Handwriting Analysis Platform
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/25 text-[#86efac] text-[clamp(10px,1.5vw,11px)] font-semibold tracking-[0.3px] whitespace-nowrap">
        <span className="w-1.5 h-[7px] shrink-0 rounded-full bg-[#4ade80] animate-status-pulse"></span>
        Model Active
      </div>
    </header>
  );
};

export default Header;
