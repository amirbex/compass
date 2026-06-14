import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "خدمات", href: "#services" },
    { name: "دوره‌ها", href: "#courses" },
    { name: "فروشگاه", href: "#products" },
    { name: "تیم ما", href: "#team" },
    { name: "تماس", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 border-b",
      isScrolled ? "bg-brand-dark/95 backdrop-blur-xl shadow-2xl border-white/5 py-4" : "bg-transparent border-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 group-hover:border-brand-gold/50 transition-colors duration-500">
             <img src="/compass.png" alt="Compass Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="font-en font-light tracking-[0.3em] text-xl text-brand-gold">COMPASS</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-en">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-[10px] uppercase tracking-[0.3em] font-medium text-brand-gold-light hover:text-white transition-colors duration-300">
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <Link to="/auth" className="bg-brand-primary text-brand-gold px-6 py-3 border border-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-brand-gold hover:text-brand-primary transition-all duration-500 font-sans backdrop-blur-md flex items-center gap-2 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              ورود / ثبت‌نام
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-gold hover:text-brand-gold-light transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-2xl shadow-xl py-10 flex flex-col items-center gap-8 border-t border-white/5 font-en">
          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="text-xs uppercase tracking-[0.3em] font-medium text-brand-gold-light hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-4 w-3/4 max-w-xs">
            <Link to="/auth" onClick={() => setMobileOpen(false)} className="bg-brand-primary text-brand-gold px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] font-sans text-center rounded-xl shadow-lg border border-brand-primary">
              ورود / ثبت‌نام
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
