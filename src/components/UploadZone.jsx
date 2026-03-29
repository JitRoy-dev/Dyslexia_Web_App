import { useRef, useCallback, useState } from 'react';
import UploadIcon from './icons/UploadIcon';

const UploadZone = ({ onFileSelect, preview, onReset }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onFileSelect(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  return (
    <>
      <div
        onClick={() => !preview && fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`group relative flex items-center justify-center overflow-hidden text-center transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[clamp(14px,2vw,20px)] border-2 ${
          preview 
            ? 'p-0 cursor-default min-h-[clamp(220px,42vw,300px)] border-solid border-white/10' 
            : 'cursor-pointer p-[clamp(36px,7vw,56px)_clamp(20px,4vw,32px)] border-dashed min-h-[220px] bg-white/5 ' + 
              (dragOver 
                ? 'border-[#667eea] bg-[#667eea]/10 scale-[1.01] shadow-[0_0_0_4px_rgba(102,126,234,0.12)]' 
                : 'border-white/15 hover:border-[#667eea]/45 hover:bg-[#667eea]/5 hover:-translate-y-[1px]')
        }`}
      >
        {!preview && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(102,126,234,0.06)_0%,transparent_70%)] opacity-0 transition-opacity duration-350 pointer-events-none group-hover:opacity-100"></div>
        )}

        {preview ? (
          <>
            <img 
              src={preview} 
              alt="preview" 
              className="block w-auto h-auto max-w-full max-h-[clamp(240px,52vw,340px)] object-contain rounded-2xl animate-[previewIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]" 
            />
            <button 
              onClick={(e) => { e.stopPropagation(); onReset(); }} 
              className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/10 text-white/80 text-[clamp(11px,2vw,12px)] font-medium cursor-pointer transition-all duration-200 hover:bg-red-500/50 hover:border-red-500/40 hover:text-white"
            >
              ✕ Remove
            </button>
          </>
        ) : (
          <div className="w-full animate-fade-in-up">
            <div className="flex items-center justify-center mx-auto mb-5 w-[72px] h-[72px] rounded-2xl bg-[#667eea]/10 border border-[#667eea]/20 text-[#667eea]/70 transition-all duration-300 group-hover:bg-[#667eea]/20 group-hover:border-[#667eea]/40 group-hover:text-[#a78bfa] group-hover:-translate-y-[3px]">
              <UploadIcon />
            </div>
            <p className="m-0 mb-2 font-bold text-[clamp(15px,2.5vw,17px)] text-white/90 tracking-[-0.2px]">
              Drop your handwriting image here
            </p>
            <p className="m-0 mb-6 text-[clamp(12px,2vw,13px)] text-white/40 font-normal">
              or click to browse — PNG, JPG, JPEG supported
            </p>
            <span className="inline-block px-6 py-[9px] rounded-lg bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 border border-[#667eea]/35 text-[#c4b5fd] text-[clamp(12px,2vw,13px)] font-semibold tracking-[0.2px] transition-all duration-250 group-hover:from-[#667eea]/35 group-hover:to-[#764ba2]/35 group-hover:border-[#667eea]/55 group-hover:text-[#e0d7ff]">
              Choose File
            </span>
          </div>
        )}
      </div>
      <input 
        ref={fileRef} 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={e => handleFile(e.target.files[0])} 
      />
    </>
  );
};

export default UploadZone;
