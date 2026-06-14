import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Coffee, Settings, LayoutDashboard, Users, BookOpen, ShoppingBag, Receipt, LogOut } from "lucide-react";

import DashboardOverview from "./admin/DashboardOverview";
import AdminCourses from "./admin/AdminCourses";
import AdminCourseRegistrations from "./admin/AdminCourseRegistrations";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminCustomers from "./admin/AdminCustomers";

export default function AdminDashboard() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-brand-light flex-row-reverse" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white p-6 flex flex-col h-full shadow-2xl relative z-20">
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
          <div className="w-10 h-10 border border-brand-gold/30 rounded-full flex items-center justify-center">
             <Coffee size={20} className="text-brand-gold" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-en text-brand-gold tracking-widest">COMPASS</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-en">Admin Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          <SidebarLink to="/admin" icon={<LayoutDashboard size={20} />} label="داشبورد" active={location.pathname === "/admin"} />
          
          <div className="pt-4 pb-2">
            <p className="text-[10px] text-brand-gold font-en uppercase tracking-widest px-3 mb-2">Academy</p>
            <SidebarLink to="/admin/courses" icon={<BookOpen size={20} />} label="مدیریت دوره‌ها" active={location.pathname === "/admin/courses"} />
            <SidebarLink to="/admin/registrations" icon={<Users size={20} />} label="ثبت‌نامی‌های دوره‌ها" active={location.pathname === "/admin/registrations"} />
          </div>

          <div className="pt-4 pb-2">
            <p className="text-[10px] text-brand-gold font-en uppercase tracking-widest px-3 mb-2">Store</p>
            <SidebarLink to="/admin/products" icon={<ShoppingBag size={20} />} label="مدیریت محصولات" active={location.pathname === "/admin/products"} />
            <SidebarLink to="/admin/orders" icon={<Receipt size={20} />} label="مدیریت سفارشات" active={location.pathname === "/admin/orders"} />
            <SidebarLink to="/admin/customers" icon={<Users size={20} />} label="مشتریان (CRM)" active={location.pathname === "/admin/customers"} />
          </div>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300">
            <Settings size={20} />
            <span className="text-sm">مشاهده سایت</span>
          </Link>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-semantic-error hover:bg-semantic-error/10 transition-all duration-300 text-sm">
            <LogOut size={20} />
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-brand-light relative z-10">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/courses" element={<AdminCourses />} />
          <Route path="/registrations" element={<AdminCourseRegistrations />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/customers" element={<AdminCustomers />} />
        </Routes>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
        active 
          ? "bg-brand-primary text-brand-gold shadow-lg shadow-brand-primary/20" 
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-gold"></span>}
    </Link>
  );
}
