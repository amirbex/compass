import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-brand-light text-brand-muted relative border-y border-brand-primary/10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-brand-gold-light/20 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        {/* Contact Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8 inline-flex items-center gap-4 text-brand-gold font-en tracking-[0.4em] text-[10px] font-medium uppercase">
            <span className="w-8 h-[1px] bg-brand-gold/30"></span><span>Connect</span>
          </div>
          <h3 className="text-5xl font-bold mb-10 font-serif text-brand-primary">ارتباط با کامپس</h3>
          <p className="text-brand-muted/70 leading-relaxed mb-16 font-light text-lg">
            برای مشاوره استراتژیک در زمینه راه‌اندازی کافه، و تامین حرفه ای ترین تجهیزات و محصولات با ما در ارتباط باشید.
          </p>

          <div className="space-y-12 max-w-sm">
            <div className="flex items-start gap-8">
              <div className="text-brand-gold mt-1 pb-4">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <div className="border-b border-brand-primary/10 pb-6 flex-1">
                <h4 className="text-brand-gold text-[10px] mb-2 uppercase tracking-[0.3em] font-en font-medium">Direct Line</h4>
                <p className="text-xl font-light font-en text-brand-primary tracking-wider" dir="ltr">+98 21 8888 8888</p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="text-brand-gold mt-1 pb-4">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div className="border-b border-brand-primary/10 pb-6 flex-1">
                <h4 className="text-brand-gold text-[10px] mb-2 uppercase tracking-[0.3em] font-en font-medium">Digital</h4>
                <p className="text-xl font-light font-en text-brand-primary tracking-wide" dir="ltr">info@compassgroup.ir</p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="text-brand-gold mt-1 pb-4">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-brand-gold text-[10px] mb-3 uppercase tracking-[0.3em] font-en font-medium">Headquarters</h4>
                <p className="leading-relaxed font-light text-brand-muted/70">تهران، خیابان ولیعصر، بالاتر از پارک وی، کوچه آرام، پلاک ۱۲، ساختمان توسعه کامپس</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-brand-panel border border-brand-primary/10 p-12 lg:p-16 relative shadow-sm rounded-xl">
          <h4 className="text-3xl font-bold mb-10 font-serif text-brand-primary">درخواست مشاوره</h4>
          <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <input type="text" placeholder=" " className="peer w-full bg-transparent border-b border-brand-primary/20 px-0 py-4 text-brand-primary focus:outline-none focus:border-brand-gold transition-colors rounded-none font-light" required />
              <label className="absolute right-0 top-4 text-brand-muted/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs peer-focus:text-brand-gold font-light pointer-events-none">نام و نام خانوادگی</label>
            </div>
            <div className="relative group">
              <input type="tel" placeholder=" " className="peer w-full bg-transparent border-b border-brand-primary/20 px-0 py-4 text-brand-primary focus:outline-none focus:border-brand-gold transition-colors rounded-none font-light text-left font-en" dir="ltr" required />
              <label className="absolute right-0 top-4 text-brand-muted/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs peer-focus:text-brand-gold font-light pointer-events-none">شماره تماس</label>
            </div>
            <div className="relative group">
              <textarea placeholder=" " rows={3} className="peer w-full bg-transparent border-b border-brand-primary/20 px-0 py-4 text-brand-primary focus:outline-none focus:border-brand-gold transition-colors resize-none rounded-none font-light" required></textarea>
              <label className="absolute right-0 top-4 text-brand-muted/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs peer-focus:text-brand-gold font-light pointer-events-none">خلاصه‌ای از نیازمندی شما</label>
            </div>
            <button className="w-full py-5 bg-brand-primary text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-primary transition-colors duration-500 rounded-sm mt-8 font-en">
              Send Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
