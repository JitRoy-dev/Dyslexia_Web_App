const features = [
  { icon: "🔍", title: "Deep Learning Analysis", desc: "Model trained on handwriting samples" },
  { icon: "⚡", title: "Instant Results", desc: "Get detection results in seconds" },
  { icon: "📊", title: "Confidence Score", desc: "Detailed probability metrics for accurate diagnosis" },
  { icon: "🔒", title: "Privacy First", desc: "Images are never stored or shared" },
];

const Features = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(clamp(160px,38vw,200px),1fr))] max-[380px]:grid-cols-1 max-[640px]:grid-cols-2 gap-[clamp(12px,2vw,16px)]">
      {features.map((f, i) => (
        <div key={i} className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-[clamp(14px,2vw,18px)] p-[clamp(18px,3vw,24px)_clamp(16px,2.5vw,20px)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#667eea]/10 hover:border-[#667eea]/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
          
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] origin-left scale-x-0 transition-transform duration-[350ms] ease-out group-hover:scale-x-100"></div>
          
          <div className="flex items-center justify-center w-[46px] h-[46px] mb-3.5 text-[clamp(20px,3.5vw,24px)] rounded-xl bg-[#667eea]/10 border border-[#667eea]/20 transition-all duration-300 group-hover:bg-[#667eea]/20 group-hover:scale-[1.08] group-hover:-rotate-3">
            {f.icon}
          </div>
          
          <p className="m-0 mb-1.5 font-bold text-[clamp(13px,2vw,14px)] text-white/90 tracking-tight">
            {f.title}
          </p>
          <p className="m-0 font-normal text-[clamp(11px,1.8vw,12.5px)] text-white/40 leading-relaxed">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Features;
