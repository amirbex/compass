import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 'PRD-01', title: 'قهوه ساز V60 هاربو', category: 'تجهیزات دم‌آوری', stock: 24, price: 1200000, inStock: true },
    { id: 'PRD-02', title: 'دانه قهوه اتیوپی یرگاچف', category: 'دانه قهوه تخصصی', stock: 0, price: 850000, inStock: false },
    { id: 'PRD-03', title: 'ترازوی دیجیتال تیمور', category: 'اکسسوری', stock: 12, price: 3400000, inStock: true },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-brand-primary/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2 font-serif">مدیریت محصولات</h2>
          <p className="text-brand-muted/60 text-sm">افزودن، ویرایش، مدیریت موجودی و قیمت فروشگاه</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-2 bg-brand-primary text-brand-gold px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-gold hover:text-brand-primary transition-all duration-300 w-full lg:w-auto"
        >
          <Plus size={18} />
          <span>افزودن محصول جدید</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border-2 border-brand-light p-8 rounded-3xl shadow-xl shadow-brand-primary/5 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-lg font-bold text-brand-primary mb-8 font-serif border-b border-brand-light pb-4">ثبت محصول جدید</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-brand-muted mb-2">نام محصول</label>
              <input type="text" className="w-full border-2 border-brand-light rounded-xl p-3.5 text-sm focus:outline-none focus:border-brand-gold focus:bg-brand-light/20 transition-all bg-transparent" placeholder="نام محصول" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-muted mb-2">دسته‌بندی</label>
              <select className="w-full border-2 border-brand-light rounded-xl p-3.5 text-sm focus:outline-none focus:border-brand-gold focus:bg-brand-light/20 transition-all bg-transparent appearance-none">
                 <option>تجهیزات دم‌آوری</option>
                 <option>دانه قهوه تخصصی</option>
                 <option>دستگاه اسپرسو</option>
                 <option>اکسسوری</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-muted mb-2">قیمت (تومان)</label>
              <input type="number" className="w-full border-2 border-brand-light rounded-xl p-3.5 text-sm focus:outline-none focus:border-brand-gold focus:bg-brand-light/20 transition-all bg-transparent font-en text-left" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-muted mb-2">موجودی انبار</label>
              <input type="number" className="w-full border-2 border-brand-light rounded-xl p-3.5 text-sm focus:outline-none focus:border-brand-gold focus:bg-brand-light/20 transition-all bg-transparent font-en text-left" placeholder="تعداد" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-bold text-brand-muted mb-2">تصویر محصول</label>
              <div className="w-full border-2 border-dashed border-brand-primary/20 rounded-xl p-6 flex flex-col justify-center items-center gap-3 cursor-pointer hover:bg-brand-primary/5 hover:border-brand-primary/40 transition-colors group">
                 <ImageIcon size={28} className="text-brand-primary/40 group-hover:text-brand-primary transition-colors" />
                 <span className="text-sm font-bold text-brand-muted/70 group-hover:text-brand-primary transition-colors">آپلود تصویر</span>
                 <span className="text-xs text-brand-muted/40 font-en">PNG, JPG up to 5MB</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-brand-light">
            <button typeof="button" onClick={() => setIsAdding(false)} className="px-6 py-3 border border-brand-primary/20 text-brand-muted rounded-xl text-sm font-bold hover:bg-brand-light transition-colors">انصراف</button>
            <button className="px-8 py-3 bg-brand-primary text-brand-gold rounded-xl text-sm font-bold shadow-lg shadow-brand-primary/20 hover:shadow-brand-gold/20 hover:bg-brand-gold hover:text-brand-primary transition-all duration-300">ذخیره محصول</button>
          </div>
        </div>
      )}

      <div className="bg-white border-2 border-brand-light rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto p-2">
          <table className="w-full text-right text-sm">
            <thead className="text-brand-primary/70 font-bold text-xs uppercase tracking-widest px-4 border-b border-brand-light">
              <tr>
                <th className="p-4 py-5">کد محصول</th>
                <th className="p-4 py-5">نام محصول</th>
                <th className="p-4 py-5">دسته‌بندی</th>
                <th className="p-4 py-5">قیمت</th>
                <th className="p-4 py-5">موجودی</th>
                <th className="p-4 py-5">وضعیت موجودی</th>
                <th className="p-4 py-5">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-light text-brand-muted">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-brand-light/30 transition-colors group">
                  <td className="p-4 font-en text-xs font-bold text-brand-muted/50">{product.id}</td>
                  <td className="p-4 font-bold text-[15px] text-brand-primary">{product.title}</td>
                  <td className="p-4 font-medium">{product.category}</td>
                  <td className="p-4 font-en font-bold text-brand-primary">{product.price.toLocaleString("fa-IR")} تومان</td>
                  <td className="p-4 font-en font-bold text-brand-primary">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-en uppercase tracking-wider font-bold shadow-sm ${product.inStock ? 'bg-secondary/10 text-secondary' : 'bg-semantic-error/10 text-semantic-error'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm border border-secondary/10" title="ویرایش">
                        <Edit2 size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-semantic-error hover:bg-semantic-error hover:text-white transition-all shadow-sm border border-semantic-error/10" title="حذف">
                        <Trash2 size={14} />
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
