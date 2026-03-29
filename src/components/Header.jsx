import BrainIcon from './icons/BrainIcon';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5 border-b border-white/10 backdrop-blur-xl bg-[#0a0818]/60 shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="flex items-center justify-center p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] shadow-[0_4px_16px_rgba(102,126,234,0.35)] transition-all duration-300 hover:-rotate-3 hover:scale-105 shrink-0">
          <div className="scale-75 sm:scale-100 transform flex items-center justify-center">
            <BrainIcon />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h1 className="m-0 text-[18px] sm:text-[21px] font-extrabold tracking-[-0.5px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4b5fd] truncate">
            DyslexiaScan
          </h1>
          <p className="m-0 text-[11px] font-medium text-white/40 uppercase tracking-[0.5px] hidden sm:block truncate">
            Handwriting Analysis Platform
          </p>
        </div>
      </div>
      <div className="flex items-center shrink-0 gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/25 text-[#86efac] text-[10px] sm:text-[11px] font-semibold tracking-[0.3px] whitespace-nowrap ml-2">
        <span className="w-1.5 h-1.5 sm:h-[7px] shrink-0 rounded-full bg-[#4ade80] animate-status-pulse"></span>
        Model Active
      </div>
    </header>
  );
};

export default Header;
