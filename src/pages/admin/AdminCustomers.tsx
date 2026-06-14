import React, { useState } from 'react';
import { Search, User, MapPin, Phone, Mail, ShoppingBag, BookOpen } from 'lucide-react';

export default function AdminCustomers() {
  const [customers] = useState([
    { 
      id: 'CUS-001', name: 'ایمان حسینی', mobile: '۰۹۱۲۱۱۱۱۱۱۱', email: 'iman@example.com', 
      address: 'تهران، ونک، خ ملاصدرا، پ ۴۵', 
      ordersCount: 4, coursesCount: 1, totalSpent: 12500000 
    },
    { 
      id: 'CUS-002', name: 'زهرا مهدوی', mobile: '۰۹۳۳۲۲۲۲۲۲۲', email: '-', 
      address: 'مشهد، وکیل آباد، بلوار هاشمیه', 
      ordersCount: 1, coursesCount: 0, totalSpent: 850000 
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">باشگاه مشتریان (CRM)</h2>
          <p className="text-brand-muted/60 text-sm">مدیریت اطلاعات مشتریان، سوابق خرید و دوره‌های ثبت‌نامی</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted/40" size={18} />
          <input 
            type="text" 
            placeholder="جستجوی مشتری (نام، موبایل)..." 
            className="w-full bg-white border-2 border-brand-light rounded-xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:bg-brand-light/20 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Customer List */}
        <div className="w-full lg:w-1/2 bg-white border-2 border-brand-light rounded-3xl shadow-sm flex flex-col overflow-hidden h-full">
          <div className="p-5 border-b border-brand-light bg-brand-light/20 font-bold text-brand-primary text-sm tracking-wide">لیست مشتریان آکادمی</div>
          <div className="overflow-y-auto flex-1 p-2">
            {customers.map(customer => (
              <div 
                key={customer.id} 
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 mb-2 rounded-2xl cursor-pointer transition-all flex items-center justify-between group ${selectedCustomer?.id === customer.id ? 'bg-brand-primary/5 border border-brand-primary/20 shadow-sm' : 'border border-transparent hover:bg-brand-light/40 hover:border-brand-light'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-colors ${selectedCustomer?.id === customer.id ? 'bg-brand-primary text-brand-gold' : 'bg-brand-light group-hover:bg-brand-primary/10 text-brand-primary'}`}>
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-brand-primary mb-1">{customer.name}</h4>
                    <p className="text-xs text-brand-muted/60 font-en tracking-widest">{customer.mobile}</p>
                  </div>
                </div>
                <div className="text-left flex flex-col items-end">
                  <span className="text-xs text-brand-muted/50 mb-1">مجموع خرید</span>
                  <span className="text-sm font-bold text-brand-gold font-en">{(customer.totalSpent / 10).toLocaleString("fa-IR")} <span className="text-[10px] text-brand-muted ml-1">تومان</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details Detail Board */}
        <div className="w-full lg:w-1/2 bg-white border-2 border-brand-light rounded-3xl shadow-sm flex-col overflow-hidden h-full lg:flex hidden relative">
          {selectedCustomer ? (
            <div className="p-10 overflow-y-auto h-full animate-in fade-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              
              <div className="flex items-center gap-8 mb-10 border-b border-brand-light pb-10">
                <div className="w-24 h-24 rounded-3xl bg-white border-2 border-brand-light shadow-xl shadow-brand-primary/5 flex items-center justify-center text-brand-primary relative overflow-hidden">
                  <User size={40} className="relative z-10" />
                  <div className="absolute inset-0 bg-brand-primary/5 blur-xl"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-serif text-brand-primary mb-3">{selectedCustomer.name}</h3>
                  <span className="text-xs bg-brand-gold/10 text-brand-gold px-3 py-1.5 rounded-lg tracking-widest font-en uppercase font-bold">{selectedCustomer.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <h4 className="font-bold text-brand-primary font-serif mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                    اطلاعات تماس
                  </h4>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 text-brand-primary"><Phone size={18} /></div>
                    <div className="pt-1">
                      <p className="text-xs text-brand-muted/50 mb-1 font-bold">شماره موبایل</p>
                      <p className="text-[15px] font-en font-bold text-brand-muted">{selectedCustomer.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 text-brand-primary"><Mail size={18} /></div>
                    <div className="pt-1">
                      <p className="text-xs text-brand-muted/50 mb-1 font-bold">آدرس ایمیل</p>
                      <p className="text-[15px] font-en font-bold text-brand-muted">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 text-brand-primary"><MapPin size={18} /></div>
                    <div className="pt-1">
                      <p className="text-xs text-brand-muted/50 mb-1 font-bold">آدرس پیش‌فرض ارسال</p>
                      <p className="text-[14px] leading-relaxed text-brand-muted">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-brand-primary font-serif mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                    فعالیت‌ها
                  </h4>
                  <div className="bg-white border-2 border-brand-light p-5 rounded-2xl flex items-center gap-5 hover:border-brand-primary/20 transition-colors shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary"><ShoppingBag size={24} /></div>
                    <div>
                      <p className="text-3xl font-bold text-brand-primary font-en mb-1">{selectedCustomer.ordersCount}</p>
                      <p className="text-xs text-brand-muted/60 font-bold">سفارش ثبت شده کالا</p>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-brand-light p-5 rounded-2xl flex items-center gap-5 hover:border-brand-primary/20 transition-colors shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary"><BookOpen size={24} /></div>
                    <div>
                      <p className="text-3xl font-bold text-brand-primary font-en mb-1">{selectedCustomer.coursesCount}</p>
                      <p className="text-xs text-brand-muted/60 font-bold">دوره آموزشی ثبت‌نامی</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-brand-muted/30">
              <div className="w-32 h-32 rounded-full border-4 border-dashed border-brand-light flex items-center justify-center mb-6">
                <User size={48} className="text-brand-light" strokeWidth={1.5} />
              </div>
              <p className="font-bold text-brand-muted/50 text-lg">مشتری مورد نظر را انتخاب کنید</p>
              <p className="text-sm mt-2">برای مشاهده جزئیات بیشتر</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
