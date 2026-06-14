import React from 'react';
import { Eye, Package, CheckCircle, Truck, XCircle } from 'lucide-react';

export default function AdminOrders() {
  const orders = [
    { id: 'ORD-8291', customer: 'ایمان حسینی', mobile: '۰۹۱۲۱۱۱۱۱۱۱', amount: 3400000, date: '۱۴۰۳/۰۶/۰۵', status: 'Pending' },
    { id: 'ORD-8290', customer: 'زهرا مهدوی', mobile: '۰۹۳۳۲۲۲۲۲۲۲', amount: 12500000, date: '۱۴۰۳/۰۶/۰۴', status: 'Shipped' },
    { id: 'ORD-8289', customer: 'امیر علی‌نژاد', mobile: '۰۹۱۹۳۳۳۳۳۳۳', amount: 850000, date: '۱۴۰۳/۰۶/۰۴', status: 'Delivered' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">مدیریت سفارشات</h2>
          <p className="text-brand-muted/60 text-sm">پیگیری سفارشات، وضعیت پرداخت و ارسال مرسولات</p>
        </div>
      </div>

      <div className="bg-white border-2 border-brand-light rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto p-2">
          <table className="w-full text-right text-sm">
            <thead className="text-brand-primary/70 font-bold text-xs uppercase tracking-widest px-4 border-b border-brand-light">
              <tr>
                <th className="p-4 py-5">شماره سفارش</th>
                <th className="p-4 py-5">خریدار</th>
                <th className="p-4 py-5">موبایل</th>
                <th className="p-4 py-5">مبلغ کل (تومان)</th>
                <th className="p-4 py-5">تاریخ ثبت</th>
                <th className="p-4 py-5">وضعیت فاکتور</th>
                <th className="p-4 py-5">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-light text-brand-muted">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-light/30 transition-colors group">
                  <td className="p-4 font-en text-xs font-bold text-brand-muted/60 group-hover:text-brand-primary transition-colors">{order.id}</td>
                  <td className="p-4 font-bold text-brand-primary text-[15px]">{order.customer}</td>
                  <td className="p-4 font-en font-medium">{order.mobile}</td>
                  <td className="p-4 font-en font-bold text-brand-primary">{order.amount.toLocaleString("fa-IR")} تومان</td>
                  <td className="p-4 font-en font-medium">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-en uppercase tracking-wider font-bold shadow-sm inline-flex items-center gap-1.5 ${
                      order.status === 'Delivered' ? 'bg-secondary/10 text-secondary' : 
                      order.status === 'Shipped' ? 'bg-brand-primary text-brand-gold' : 
                      'bg-brand-gold/20 text-brand-dark'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <button className="w-8 h-8 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-brand-gold rounded-lg shadow-sm border border-brand-primary/10 transition-colors" title="مشاهده جزئیات">
                         <Eye size={15} />
                       </button>
                       <div className="w-px h-5 bg-brand-light mx-1"></div>
                       <button className="w-8 h-8 flex items-center justify-center text-brand-muted/60 hover:bg-brand-gold hover:text-white rounded-lg shadow-sm border border-transparent hover:border-brand-gold transition-colors" title="در حال پردازش">
                         <Package size={15} />
                       </button>
                       <button className="w-8 h-8 flex items-center justify-center text-brand-muted/60 hover:bg-brand-primary hover:text-white rounded-lg shadow-sm border border-transparent hover:border-brand-primary transition-colors" title="ارسال شد">
                         <Truck size={15} />
                       </button>
                       <button className="w-8 h-8 flex items-center justify-center text-brand-muted/60 hover:bg-secondary hover:text-white rounded-lg shadow-sm border border-transparent hover:border-secondary transition-colors" title="تحویل شد">
                         <CheckCircle size={15} />
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
