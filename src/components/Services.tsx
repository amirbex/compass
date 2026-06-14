import { BookOpen, Coffee, Layout, Users } from 'lucide-react';

const services = [
  {
    title: "دوره‌های آموزشی",
    description: "آموزش گام‌به‌گام باریستایی و مدیریت کافه توسط اساتید مجرب و با ارائه مدرک معتبر.",
    icon: <BookOpen size={28} strokeWidth={1.5} />,
  },
  {
    title: "محصولات و تجهیزات",
    description: "تأمین بهترین نوع قهوه‌های تخصصی، اکسسوری‌های حرفه‌ای و ماشین‌آلات صنعتی.",
    icon: <Coffee size={28} strokeWidth={1.5} />,
  },
  {
    title: "مشاوره و راه‌اندازی",
    description: "طراحی کانسپت، محاسبه منو و هزینه‌ها، و راه‌اندازی صفر تا صد کافه‌های مدرن.",
    icon: <Layout size={28} strokeWidth={1.5} />,
  },
  {
    title: "تیم حرفه‌ای",
    description: "پشتیبانی فنی و تخصصی توسط تیمی از بهترین‌های صنعت قهوه ایران.",
    icon: <Users size={28} strokeWidth={1.5} />,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#0A0A0A] border-y border-brand-primary/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-gold-light/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="text-[11px] font-en tracking-[0.5em] text-brand-gold font-bold mb-6 uppercase">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white font-serif mb-8 drop-shadow-lg">خدمات تخصصی کامپس</h3>
          <div className="w-[2px] h-20 bg-gradient-to-b from-brand-gold to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className={`p-10 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-gold/40 shadow-2xl hover:-translate-y-4 transition-all duration-700 group flex flex-col items-start relative overflow-hidden rounded-[2rem] ${idx % 2 !== 0 ? 'lg:mt-12' : ''}`}>
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-gold/50 to-brand-gold group-hover:w-full transition-all duration-700 ease-out"></div>
              
              <div className="absolute -bottom-6 -right-6 text-white/5 text-[120px] font-en font-black pointer-events-none group-hover:scale-110 group-hover:text-white/10 transition-all duration-700 leading-none">0{idx + 1}</div>
              
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8 relative z-10 group-hover:bg-brand-gold group-hover:rotate-12 transition-all duration-700 shadow-inner group-hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                <div className="text-brand-gold group-hover:text-[#0A0A0A] transition-colors duration-700">
                  {svc.icon}
                </div>
              </div>
              
              <h4 className="text-xl font-bold mb-4 text-white font-serif relative z-10 group-hover:text-brand-gold transition-colors duration-500">{svc.title}</h4>
              <p className="text-white/60 text-sm leading-loose font-light relative z-10">{svc.description}</p>
              
              <div className="mt-auto pt-8 flex items-center gap-3 w-full relative z-10 group-hover:gap-5 transition-all duration-500 cursor-pointer">
                 <div className="w-8 h-[1px] bg-brand-gold/50 group-hover:w-16 transition-all duration-700"></div>
                 <span className="text-[10px] text-brand-gold tracking-widest font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
