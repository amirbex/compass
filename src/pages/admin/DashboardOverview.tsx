import React from 'react';
import { Users, Receipt, BookOpen, ShoppingBag, TrendingUp, Filter } from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    { title: 'مجموع درآمد', value: '۱۲۰,۰۰۰,۰۰۰ تومان', change: '+۱۲٪', icon: <TrendingUp className="text-secondary" /> },
    { title: 'سفارشات جدید', value: '۸۴', change: '+۵٪', icon: <Receipt className="text-secondary" /> },
    { title: 'ثبت‌نام‌های فعال', value: '۳۲', change: '+۱۸٪', icon: <BookOpen className="text-secondary" /> },
    { title: 'مشتریان کل', value: '۱,۰۴۲', change: '+۲٪', icon: <Users className="text-secondary" /> },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">داشبورد مدیریت</h2>
          <p className="text-brand-muted/60 text-sm">نمای کلی وضعیت دوره‌ها و فروشگاه کامپس</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none justify-center items-center gap-2 border-2 border-brand-primary/10 bg-white px-5 py-2.5 rounded-xl text-sm font-bold text-brand-muted hover:border-brand-gold hover:text-brand-primary shadow-sm hover:shadow-md transition-all">
            <Filter size={16} />
            <span>فیلتر زمان</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border-none p-6 rounded-2xl shadow-xl shadow-brand-primary/5 hover:shadow-brand-primary/10 transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors pointer-events-none"></div>
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl border-2 border-brand-light flex items-center justify-center bg-white shadow-sm text-brand-primary group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-brand-primary bg-brand-light px-3 py-1.5 rounded-lg shadow-sm" dir="ltr">{stat.change}</span>
            </div>
            <h3 className="text-brand-muted/70 text-sm mb-2 relative z-10 font-bold">{stat.title}</h3>
            <p className="text-3xl font-bold text-brand-primary font-en relative z-10 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border-2 border-brand-light rounded-3xl shadow-sm p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-brand-primary font-serif">آخرین سفارشات فروشگاه</h3>
            <button className="text-xs font-bold text-brand-gold hover:text-brand-primary transition-colors">مشاهده همه</button>
          </div>
          <div className="space-y-5 flex-1">
             <div className="flex items-center justify-between py-4 border-b border-brand-light last:border-0 hover:bg-brand-light/20 px-2 rounded-xl transition-colors">
               <div>
                 <p className="font-bold text-brand-primary mb-1 text-[15px]">امیر کاظمی</p>
                 <p className="text-xs text-brand-muted/60 font-en tracking-widest">ORD-7281</p>
               </div>
               <div className="text-left flex flex-col items-end gap-2">
                 <p className="font-bold text-[15px] text-brand-primary font-en">۵,۴۰۰,۰۰۰ تومان</p>
                 <span className="text-[10px] text-secondary bg-secondary/10 px-2.5 py-1 rounded-md font-en uppercase tracking-wider font-bold shadow-sm">Paid</span>
               </div>
             </div>
             <div className="flex items-center justify-between py-4 border-b border-brand-light last:border-0 hover:bg-brand-light/20 px-2 rounded-xl transition-colors">
               <div>
                 <p className="font-bold text-brand-primary mb-1 text-[15px]">سارا احمدی</p>
                 <p className="text-xs text-brand-muted/60 font-en tracking-widest">ORD-7280</p>
               </div>
               <div className="text-left flex flex-col items-end gap-2">
                 <p className="font-bold text-[15px] text-brand-primary font-en">۱۲,۰۰۰,۰۰۰ تومان</p>
                 <span className="text-[10px] text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-md font-en uppercase tracking-wider font-bold shadow-sm">Pending</span>
               </div>
             </div>
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-white border-2 border-brand-light rounded-3xl shadow-sm p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-brand-primary font-serif">آخرین ثبت‌نام‌های آکادمی</h3>
            <button className="text-xs font-bold text-brand-gold hover:text-brand-primary transition-colors">مشاهده همه</button>
          </div>
          <div className="space-y-5 flex-1">
             <div className="flex items-center justify-between py-4 border-b border-brand-light last:border-0 hover:bg-brand-light/20 px-2 rounded-xl transition-colors">
               <div>
                 <p className="font-bold text-brand-primary mb-1 text-[15px]">علی رضایی</p>
                 <p className="text-xs text-brand-muted/60">دوره باریستا مقدماتی</p>
               </div>
               <div className="text-left">
                 <span className="text-[10px] text-secondary bg-secondary/10 px-2.5 py-1 rounded-md font-en uppercase tracking-wider font-bold shadow-sm">Confirmed</span>
               </div>
             </div>
             <div className="flex items-center justify-between py-4 border-b border-brand-light last:border-0 hover:bg-brand-light/20 px-2 rounded-xl transition-colors">
               <div>
                 <p className="font-bold text-brand-primary mb-1 text-[15px]">نگار محمدی</p>
                 <p className="text-xs text-brand-muted/60">آرت لاته پیشرفته</p>
               </div>
               <div className="text-left">
                 <span className="text-[10px] text-semantic-error bg-semantic-error/10 px-2.5 py-1 rounded-md font-en uppercase tracking-wider font-bold shadow-sm">Canceled</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
