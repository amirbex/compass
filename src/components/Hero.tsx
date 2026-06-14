import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-[#0A0A0A] pt-24 pb-20">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=2000&q=80" 
          alt="Cinematic Coffee" 
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity scale-110 animate-[pulse_15s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 relative z-10 flex flex-col items-center text-center pb-20">
        <div className="mb-6 md:mb-10 flex items-center gap-2 md:gap-4 text-brand-gold font-en tracking-[0.15em] md:tracking-[0.3em] uppercase text-[9px] md:text-[11px] font-bold bg-brand-gold/10 px-4 md:px-6 py-2 rounded-full border border-brand-gold/20 backdrop-blur-md whitespace-nowrap shadow-lg">
          <span className="w-4 md:w-8 h-[2px] bg-brand-gold/60"></span>
          <span>COMPASS COFFEE ACADEMY</span>
          <span className="w-4 md:w-8 h-[2px] bg-brand-gold/60"></span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 font-serif drop-shadow-2xl">
          مسیر حرفه‌ای شدن <br className="hidden sm:block" />
          <span className="text-brand-gold mt-2 sm:mt-4 block">در دنیای نوشیدنی</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-brand-gold-light/90 mb-10 max-w-2xl font-light">
          آکادمی آموزش تخصصی باریستا و فروشگاه آنلاین تجهیزات حرفه‌ای قهوه کامپس
        </p>
        
        <div className="flex w-full flex-col sm:flex-row items-center gap-4 justify-center z-20">
          <a href="#courses" className="w-full sm:w-[220px] bg-brand-gold text-brand-dark h-[54px] flex items-center justify-center font-bold rounded-2xl hover:bg-white transition-all duration-300 tracking-widest text-[13px] shadow-[0_0_25px_rgba(197,160,89,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:-translate-y-1">
            شروع مسیر یادگیری
          </a>
          <a href="#products" className="w-full sm:w-[220px] bg-white/5 border border-white/20 text-white h-[54px] flex items-center justify-center font-bold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 tracking-widest text-[13px] backdrop-blur-md hover:-translate-y-1">
            مشاهده فروشگاه
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.4em] font-en text-brand-gold font-bold">Scroll Down</span>
        <div className="w-[2px] h-12 md:h-16 bg-brand-dark overflow-hidden rounded-full relative">
           <div className="w-full h-1/2 bg-brand-gold animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
