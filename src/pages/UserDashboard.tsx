import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, User, ShoppingBag, Receipt, BookOpen, Wallet, LogOut, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, userData, loading } = useAuth();

  // Protect route
  if (!loading && !user) navigate('/auth');

  // Show loading
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-brand-light"><div className="w-10 h-10 border-4 border-brand-primary border-t-brand-gold rounded-full animate-spin"></div></div>;

  const navItems = [
    { id: 'dashboard', label: 'داشبورد', icon: <User size={18} /> },
    { id: 'cart', label: 'سبد خرید', icon: <ShoppingBag size={18} /> },
    { id: 'orders', label: 'سابقه خرید فروشگاه', icon: <Receipt size={18} /> },
    { id: 'courses', label: 'دوره‌های آکادمی من', icon: <BookOpen size={18} /> },
    { id: 'wallet', label: 'کیف پول', icon: <Wallet size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-light flex flex-col md:flex-row relative" dir="rtl">
      
      {/* Mobile Header (Shows only on small screens) */}
      <div className="md:hidden bg-brand-dark p-4 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-center gap-2 text-brand-gold">
          <Coffee size={24} strokeWidth={1.5} />
          <span className="font-en font-light tracking-widest text-lg">COMPASS</span>
        </div>
        <button onClick={() => navigate('/')} className="text-white/50 hover:text-white transition-colors">
          <Home size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-brand-dark p-6 md:h-screen flex flex-col md:sticky md:top-0 z-20 shadow-2xl">
        <div className="hidden md:flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
          <div className="w-12 h-12 border border-brand-gold/30 rounded-full flex items-center justify-center bg-white/5">
             <User size={24} className="text-brand-gold" strokeWidth={1.5} />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-lg font-bold text-white font-serif truncate">{userData?.name || user?.displayName || 'کاربر'}</h2>
            <p className="text-brand-gold-light text-xs font-en mt-1 truncate">{userData?.mobile || user?.email}</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-bold whitespace-nowrap md:whitespace-normal flex-shrink-0 ${
                activeTab === item.id 
                  ? "bg-brand-primary text-brand-gold shadow-lg shadow-brand-primary/20" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeTab === item.id && <span className="hidden md:block mr-auto w-1.5 h-1.5 rounded-full bg-brand-gold"></span>}
            </button>
          ))}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-white/10 space-y-4 hidden md:block">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 p-3 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300">
            <ArrowRight size={18} />
            <span className="text-sm">بازگشت به سایت</span>
          </button>
          <button onClick={() => { auth.signOut(); navigate('/auth'); }} className="w-full flex items-center gap-3 p-3 rounded-lg text-semantic-error hover:bg-semantic-error/10 transition-all duration-300 text-sm">
            <LogOut size={18} />
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardTab userData={userData} user={user} />}
        {activeTab === 'cart' && <CartTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'courses' && <CoursesTab />}
        {activeTab === 'wallet' && <WalletTab userData={userData} />}
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// Sub Nav Tabs Components
// -------------------------------------------------------------

function DashboardTab({ userData, user }: { userData: any, user: any }) {
  const balance = userData?.walletBalance || 0;
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">داشبورد کاربری</h2>
          <p className="text-brand-muted/60 text-sm">خلاصه‌ای از فعالیت‌های شما در آکادمی و فروشگاه کامپس</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-light px-5 py-2.5 rounded-xl text-sm font-bold border border-brand-primary/10 hover:border-brand-gold hover:text-brand-primary transition-all shadow-sm">
          <User size={16} />
          ویرایش پروفایل
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border-none p-6 rounded-2xl shadow-lg shadow-brand-primary/5 hover:shadow-brand-primary/10 transition-all relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-light border-2 border-white shadow-sm text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform"><Wallet size={24} /></div>
            <div>
              <p className="text-sm font-bold text-brand-muted/60 mb-1">موجودی کیف پول</p>
              <p className="text-2xl font-bold text-brand-primary font-en">{balance.toLocaleString('fa-IR')} <span className="text-[10px] uppercase font-sans text-brand-muted">تومان</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white border-none p-6 rounded-2xl shadow-lg shadow-brand-primary/5 hover:shadow-brand-primary/10 transition-all relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-light border-2 border-white shadow-sm text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform"><BookOpen size={24} /></div>
            <div>
              <p className="text-sm font-bold text-brand-muted/60 mb-1">دوره‌های فعال</p>
              <p className="text-2xl font-bold text-brand-primary font-en">۰ <span className="text-[10px] uppercase font-sans text-brand-muted">دوره</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white border-none p-6 rounded-2xl shadow-lg shadow-brand-primary/5 hover:shadow-brand-primary/10 transition-all relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-light border-2 border-white shadow-sm text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform"><Receipt size={24} /></div>
            <div>
              <p className="text-sm font-bold text-brand-muted/60 mb-1">سفارشات فروشگاه</p>
              <p className="text-2xl font-bold text-brand-primary font-en">۰ <span className="text-[10px] uppercase font-sans text-brand-muted">سفارش</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-brand-light p-8 rounded-3xl shadow-sm">
        <h3 className="font-bold text-brand-primary mb-6 font-serif text-lg border-b border-brand-light pb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
          اطلاعات حساب کاربری
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <p className="text-xs text-brand-muted/50 mb-2 font-bold">نام و نام خانوادگی</p>
            <p className="font-bold text-brand-primary text-[15px]">{userData?.name || user?.displayName || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-brand-muted/50 mb-2 font-bold">شماره موبایل</p>
            <p className="font-bold text-brand-primary text-[15px] font-en tracking-widest">{userData?.mobile || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-brand-muted/50 mb-2 font-bold">آدرس ایمیل</p>
            <p className="font-bold text-brand-primary text-[15px] font-en tracking-wider">{user?.email}</p>
          </div>
          <div className="col-span-full">
             <p className="text-xs text-brand-muted/50 mb-2 font-bold">آدرس پیش‌فرض ارسال</p>
             <p className="font-bold text-brand-primary text-[14px] leading-relaxed">{userData?.address || 'آدرسی ثبت نشده است.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">سبد خرید</h2>
          <p className="text-brand-muted/60 text-sm">محصولات آماده پرداخت شما</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {/* Sample Cart Item */}
          <div className="bg-white border-2 border-brand-light p-4 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-brand-primary/20 transition-colors">
            <div className="w-full sm:w-28 sm:h-28 h-48 bg-brand-light/50 rounded-2xl overflow-hidden flex-shrink-0 p-3 relative group-hover:bg-brand-primary/5 transition-colors">
               <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&q=80" alt="coffee" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 text-center sm:text-right">
              <h4 className="font-bold text-brand-primary mb-1 text-[15px]">قهوه عربیکا اسپشیالتی</h4>
              <p className="text-xs text-brand-muted/60 mb-3">۱ کیلویی - رست مدیوم دارک</p>
              <p className="font-bold text-brand-gold font-en text-lg">۱,۲۰۰,۰۰۰ <span className="text-[10px] font-sans text-brand-muted">تومان</span></p>
            </div>
            <div className="flex items-center gap-4 bg-brand-light/50 p-2 rounded-xl">
              <button className="w-8 h-8 rounded-lg bg-white shadow-sm text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-brand-gold transition-colors font-bold">-</button>
              <span className="font-en font-bold text-brand-primary w-4 text-center">1</span>
              <button className="w-8 h-8 rounded-lg bg-white shadow-sm text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-brand-gold transition-colors font-bold">+</button>
            </div>
          </div>
          
           {/* Sample Cart Item 2 */}
          <div className="bg-white border-2 border-brand-light p-4 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-brand-primary/20 transition-colors">
            <div className="w-full sm:w-28 sm:h-28 h-48 bg-brand-light/50 rounded-2xl overflow-hidden flex-shrink-0 p-3 relative group-hover:bg-brand-primary/5 transition-colors">
               <img src="https://images.unsplash.com/photo-1505353594098-f2b1d68351ba?w=300&q=80" alt="tamper" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 text-center sm:text-right">
              <h4 className="font-bold text-brand-primary mb-1 text-[15px]">تمپر حرفه‌ای سایز ۵۸mm</h4>
              <p className="text-xs text-brand-muted/60 mb-3">استیل ضد زنگ / دسته چوبی</p>
              <p className="font-bold text-brand-gold font-en text-lg">۸۵۰,۰۰۰ <span className="text-[10px] font-sans text-brand-muted">تومان</span></p>
            </div>
            <div className="flex items-center gap-4 bg-brand-light/50 p-2 rounded-xl">
              <button className="w-8 h-8 rounded-lg bg-white shadow-sm text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-brand-gold transition-colors font-bold">-</button>
              <span className="font-en font-bold text-brand-primary w-4 text-center">1</span>
              <button className="w-8 h-8 rounded-lg bg-white shadow-sm text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-brand-gold transition-colors font-bold">+</button>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="w-full lg:w-80 bg-white border-2 border-brand-light p-8 rounded-3xl shadow-sm h-fit sticky top-6">
          <h3 className="font-bold text-brand-primary mb-6 font-serif text-lg border-b border-brand-light pb-4">خلاصه سفارش</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted/70 font-bold">مبلغ کل کالاها</span>
              <span className="font-bold font-en text-brand-muted/80">۲,۰۵۰,۰۰۰ تومان</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted/70 font-bold">هزینه ارسال</span>
              <span className="font-bold font-en text-brand-muted/80">وابسته به آدرس</span>
            </div>
            <div className="border-t-2 border-brand-light border-dashed pt-6 flex flex-col gap-2">
              <span className="text-xs text-brand-primary font-bold">مبلغ قابل پرداخت</span>
              <span className="font-bold font-en text-brand-gold text-2xl tracking-tight text-left">۲,۰۵۰,۰۰۰ <span className="text-[10px] font-sans text-brand-muted">تومان</span></span>
            </div>
          </div>
          <button className="w-full py-4 bg-brand-primary text-brand-gold rounded-2xl font-bold hover:shadow-xl hover:shadow-brand-gold/20 hover:bg-brand-gold hover:text-brand-primary transition-all duration-300 flex items-center justify-center gap-2 group">
            تکمیل پرداخت
            <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">سابقه خرید</h2>
          <p className="text-brand-muted/60 text-sm">پیگیری و مشاهده فاکتور سفارشات فروشگاه</p>
        </div>
      </div>

      <div className="bg-white border-2 border-brand-light rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto p-2">
          <table className="w-full text-right text-sm">
            <thead className="text-brand-primary/70 font-bold text-xs uppercase tracking-widest px-4 border-b border-brand-light">
              <tr>
                <th className="p-4 py-5">شماره سفارش</th>
                <th className="p-4 py-5">تاریخ ثبت</th>
                <th className="p-4 py-5">مبلغ کل</th>
                <th className="p-4 py-5">وضعیت سفارش</th>
                <th className="p-4 py-5">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-light text-brand-muted">
              <tr className="hover:bg-brand-light/30 transition-colors group">
                <td className="p-4 font-en font-bold text-brand-primary">ORD-7281</td>
                <td className="p-4 font-en font-medium">۱۴۰۳/۰۶/۰۵</td>
                <td className="p-4 font-en font-bold text-brand-primary text-[15px]">۵,۴۰۰,۰۰۰ <span className="text-[9px] font-sans text-brand-muted font-normal">تومان</span></td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md bg-secondary/10 text-secondary text-[10px] font-en uppercase tracking-wider font-bold shadow-sm inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-secondary"></span> Delivered</span>
                </td>
                <td className="p-4">
                  <button className="text-brand-gold text-xs font-bold hover:text-brand-primary transition-colors flex items-center gap-1"><Receipt size={14} /> مشاهده فاکتور</button>
                </td>
              </tr>
              <tr className="hover:bg-brand-light/30 transition-colors group">
                <td className="p-4 font-en font-bold text-brand-primary">ORD-6102</td>
                <td className="p-4 font-en font-medium">۱۴۰۳/۰۴/۱۲</td>
                <td className="p-4 font-en font-bold text-brand-primary text-[15px]">۸۵۰,۰۰۰ <span className="text-[9px] font-sans text-brand-muted font-normal">تومان</span></td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md bg-secondary/10 text-secondary text-[10px] font-en uppercase tracking-wider font-bold shadow-sm inline-flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-secondary"></span> Delivered</span>
                </td>
                <td className="p-4">
                  <button className="text-brand-gold text-xs font-bold hover:text-brand-primary transition-colors flex items-center gap-1"><Receipt size={14} /> مشاهده فاکتور</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CoursesTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">دوره‌های آکادمی من</h2>
          <p className="text-brand-muted/60 text-sm">وضعیت ثبت‌نام و دوره‌های آموزشی شما در کامپس</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-brand-light p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-brand-primary/20 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-primary/10 transition-colors"></div>
          
          <div className="w-full sm:w-32 sm:h-32 h-48 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 relative z-10">
             <img src="https://images.unsplash.com/photo-1542385151-efd9000785a0?w=300&q=80" alt="Course" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex py-1 px-2.5 bg-secondary/10 text-secondary text-[10px] font-en uppercase tracking-widest font-bold rounded-lg items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Confirmed</span>
            </div>
            <h4 className="font-bold text-brand-primary font-serif mb-3 text-lg leading-tight">باریستای پایه تا پیشرفته</h4>
            <div className="space-y-2 mt-auto">
              <p className="text-xs text-brand-muted/70 flex items-center gap-2">
                <BookOpen size={14} className="text-brand-gold" />
                تاریخ شروع: <span className="font-en font-bold text-brand-muted">۱۵ مهر ۱۴۰۳</span>
              </p>
              <p className="text-xs text-brand-muted/70 flex items-center gap-2">
                 <User size={14} className="text-brand-gold" />
                 مدرس: <span className="font-bold text-brand-muted">امیرعلی کاظمی</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full mb-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">کیف پول کامپس</h2>
          <p className="text-brand-muted/60 text-sm">مدیریت موجودی برای خریدهای سریع‌تر و راحت‌تر</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gradient-to-br from-brand-primary via-brand-dark to-[#1a1a1a] p-8 rounded-[2rem] shadow-2xl shadow-brand-primary/20 text-white relative overflow-hidden mb-8 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/20 transition-colors"></div>
            
            <div className="relative z-10 flex justify-between items-center mb-10">
              <div className="flex items-center gap-2 text-brand-gold">
                <Coffee size={24} />
                <span className="font-en font-light tracking-[0.3em] text-lg">COMPASS</span>
              </div>
              <span className="text-[10px] py-1 px-3 bg-white/10 rounded-full font-en tracking-widest opacity-80 uppercase border border-white/10 font-bold backdrop-blur-md">VIP Member</span>
            </div>

            <div className="relative z-10">
              <p className="text-sm opacity-60 mb-2 font-medium">موجودی فعلی (تومان)</p>
              <div className="text-5xl font-bold font-en tracking-wider mb-2 text-white drop-shadow-md">
                0 <span className="text-2xl text-brand-gold opacity-80">.00</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between relative z-10 text-xs font-en opacity-60 tracking-widest">
               <span>•••• •••• •••• 1284</span>
               <span>08/25</span>
            </div>
          </div>

          <div className="bg-white border-2 border-brand-light p-8 rounded-3xl shadow-sm">
             <h4 className="font-bold text-brand-primary mb-6 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
               شارژ سریع کیف پول
             </h4>
             <div className="grid grid-cols-3 gap-4 mb-6">
               {['۵۰۰,۰۰۰', '۱,۰۰۰,۰۰۰', '۲,۰۰۰,۰۰۰'].map(amount => (
                 <button key={amount} className="py-3.5 border-2 border-brand-light rounded-2xl text-[13px] font-en font-bold text-brand-muted hover:border-brand-gold hover:text-brand-primary hover:bg-brand-light/20 transition-all">
                   {amount}
                 </button>
               ))}
             </div>
             <div className="relative mb-6">
               <input type="text" placeholder="مبلغ دلخواه (تومان)" className="w-full border-2 border-brand-light rounded-2xl p-4 text-sm focus:outline-none focus:border-brand-gold focus:bg-brand-light/20 transition-all bg-transparent font-en tracking-wider" dir="ltr" />
             </div>
             <button className="w-full py-4 bg-brand-primary text-brand-gold rounded-2xl font-bold hover:bg-brand-gold hover:text-brand-primary hover:shadow-xl hover:shadow-brand-gold/20 transition-all duration-300">
               اتصال به درگاه و شارژ
             </button>
          </div>
        </div>
        
        {/* Transaction History Placeholder */}
        <div className="bg-white border-2 border-brand-light p-8 rounded-3xl shadow-sm h-fit">
           <h4 className="font-bold text-brand-primary mb-6 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
             آخرین تراکنش‌ها
           </h4>
           <div className="flex flex-col items-center justify-center py-12 text-brand-muted/40 text-sm">
             <div className="w-20 h-20 rounded-full border-4 border-dashed border-brand-light flex items-center justify-center mb-4">
                <Wallet size={32} className="text-brand-light" />
             </div>
             <p className="font-bold">تراکنشی یافت نشد</p>
           </div>
        </div>
      </div>

    </div>
  );
}
