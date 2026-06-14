import React from 'react';
import { Download, Search, CheckCircle, XCircle } from 'lucide-react';

export default function AdminCourseRegistrations() {
  const registrations = [
    { id: 'REG-101', name: 'علی رضایی', mobile: '۰۹۱۲۳۴۵۶۷۸۹', email: 'ali@example.com', course: 'دوره جامع باریستا', date: '۱۴۰۳/۰۶/۰۱', status: 'Confirmed' },
    { id: 'REG-102', name: 'نگار محمدی', mobile: '۰۹۳۵۱۲۳۴۵۶۷', email: 'negar@example.com', course: 'آرت لاته پیشرفته', date: '۱۴۰۳/۰۶/۰۲', status: 'Pending' },
    { id: 'REG-103', name: 'سینا احمدی', mobile: '۰۹۱۹۸۷۶۵۴۳۲', email: 'sina@example.com', course: 'دوره جامع باریستا', date: '۱۴۰۳/۰۶/۰۳', status: 'Canceled' },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">ثبت‌نامی‌های دوره‌ها</h2>
          <p className="text-brand-muted/60 text-sm">مدیریت و پیگیری ثبت‌نام دانشجویان در آکادمی</p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted/40" size={18} />
            <input 
              type="text" 
              placeholder="جستجو نام، موبایل..." 
              className="w-full bg-white border border-brand-primary/20 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-brand-primary text-brand-gold px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-gold hover:text-brand-primary transition-colors whitespace-nowrap">
            <Download size={16} />
            <span>خروجی Excel</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-brand-primary/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-brand-light border-b border-brand-primary/10 text-brand-primary font-bold">
              <tr>
                <th className="p-4">کد رهگیری</th>
                <th className="p-4">نام دانشجو</th>
                <th className="p-4">موبایل</th>
                <th className="p-4">دوره انتخابی</th>
                <th className="p-4">تاریخ ثبت‌نام</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4">تغییر وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/5 text-brand-muted">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-brand-light/50 transition-colors">
                  <td className="p-4 font-en text-xs">{reg.id}</td>
                  <td className="p-4 font-bold text-brand-primary">{reg.name}</td>
                  <td className="p-4 font-en">{reg.mobile}</td>
                  <td className="p-4">{reg.course}</td>
                  <td className="p-4 font-en">{reg.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-en uppercase tracking-wider ${
                      reg.status === 'Confirmed' ? 'bg-secondary/10 text-secondary' : 
                      reg.status === 'Pending' ? 'bg-brand-gold/10 text-brand-gold' : 
                      'bg-semantic-error/10 text-semantic-error'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <button className="p-1.5 text-secondary bg-secondary/5 rounded hover:bg-secondary hover:text-white transition-colors" title="تایید">
                         <CheckCircle size={16} />
                       </button>
                       <button className="p-1.5 text-semantic-error bg-semantic-error/5 rounded hover:bg-semantic-error hover:text-white transition-colors" title="لغو">
                         <XCircle size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
