import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-[#050505] flex flex-col items-center justify-center text-[10px] uppercase tracking-[0.3em] text-white/30 border-t border-white/5 px-6 font-medium font-en gap-8">
      <div className="flex gap-10">
        <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
        <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
        <a href="#" className="hover:text-white transition-colors duration-300">Twitter</a>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>&copy; {new Date().getFullYear()} Compass Group Platform</span>
        <span>Tehran, IR &bull; Modern Hospitality Solutions</span>
      </div>
    </footer>
  );
}
