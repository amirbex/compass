import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types";
import { cn } from "../lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ShoppingCart, Info, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'consumables' | 'accessories' | 'equipment'>('consumables');

  useEffect(() => {
    axios.get("/api/products")
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Expected array from /api/products, got:", res.data);
          setProducts([]);
        }
        setLoading(false);
      });
  }, []);

  const tabs = [
    { id: 'consumables', label: 'مواد مصرفی' },
    { id: 'accessories', label: 'اکسسوری' },
    { id: 'equipment', label: 'تجهیزات' },
  ] as const;

  const filteredProducts = products.filter(p => p.category === activeTab);

  return (
    <section id="products" className="py-32 bg-brand-light border-b border-brand-primary/10 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-1/3 h-1/2 bg-brand-gold-light/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-[10px] font-en tracking-[0.4em] text-brand-gold font-medium mb-6 uppercase">Collection</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-primary font-serif">فروشگاه تخصصی</h3>
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent mt-8"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-4 p-1 border-b border-brand-primary/10 w-full max-w-lg justify-center relative">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-4 text-[10px] font-bold transition-all duration-500 uppercase tracking-[0.2em] relative font-en",
                  activeTab === tab.id ? "text-brand-primary" : "text-brand-muted/50 hover:text-brand-muted"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Slider */}
        {loading ? (
             <div className="flex justify-center py-20"><span className="text-brand-muted/30 font-en uppercase tracking-[0.3em] text-xs animate-pulse">Loading Archive...</span></div>
        ) : (
          <div className="relative group/slider px-4 md:px-12">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-brand-muted/30 py-20 font-en font-light tracking-widest uppercase text-xs">No items found in archive.</div>
            ) : (
              <>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.product-next',
                    prevEl: '.product-prev',
                  }}
                  pagination={{ clickable: true, el: '.product-pagination' }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="pb-16"
                >
                  {filteredProducts.map(product => (
                    <SwiperSlide key={product.id} className="h-auto">
                      <div className="h-full flex flex-col bg-white p-6 rounded-3xl border border-brand-primary/5 hover:border-brand-gold/30 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden">
                        
                        <div className="w-full aspect-[4/3] mb-6 overflow-hidden relative flex items-center justify-center p-6 bg-brand-light/50 rounded-2xl group-hover:bg-brand-light transition-colors duration-500">
                          <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-1000 ease-out mix-blend-darken" />
                          
                          {/* Stock Badge */}
                          {!product.inStock && (
                            <div className="absolute top-4 right-4 bg-semantic-error text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] font-en rounded-full shadow-lg">ناموجود</div>
                          )}
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 border border-brand-primary/10 text-brand-primary px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] font-en rounded-full bg-white/80 backdrop-blur-md shadow-sm">
                            {product.category}
                          </div>
                        </div>

                        <div className="flex flex-col flex-1 text-right relative z-10">
                          <h4 className="font-bold text-lg mb-3 text-brand-primary font-serif line-clamp-2 min-h-[3rem] group-hover:text-brand-gold transition-colors duration-300">{product.title}</h4>
                          <p className="text-xs text-brand-muted/70 mb-6 font-light line-clamp-2 leading-relaxed">{product.description}</p>
                          
                          <div className="mt-auto mb-6 flex items-end justify-between">
                            <span className="text-brand-primary font-en font-bold tracking-wider text-xl block">{product.price.toLocaleString("fa-IR")} <span className="text-[10px] text-brand-gold uppercase tracking-widest ml-1">تومان</span></span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button 
                              className="py-3 px-2 border border-brand-primary/20 text-brand-primary text-[10px] font-bold tracking-widest hover:border-brand-primary hover:bg-brand-primary hover:text-brand-gold transition-all duration-500 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                            >
                              <Info size={14} />
                              جزئیات
                            </button>

                            <button 
                              onClick={() => navigate('/auth')}
                              disabled={!product.inStock}
                              className="py-3 px-2 bg-brand-primary text-brand-gold text-[10px] font-bold tracking-widest hover:bg-brand-gold hover:text-brand-primary transition-all duration-500 disabled:opacity-30 disabled:hover:bg-brand-primary disabled:hover:text-brand-gold rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20"
                            >
                              <ShoppingCart size={14} />
                              افزودن
                            </button>
                          </div>
                        </div>

                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Custom Navigation */}
                <button className="product-prev absolute left-0 top-1/2 -translate-y-1/2 -mt-8 z-10 w-10 h-10 rounded-full bg-brand-panel border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-brand-gold transition-all md:-ml-5 lg:ml-0 shadow-lg">
                  <ChevronLeft size={20} />
                </button>
                <button className="product-next absolute right-0 top-1/2 -translate-y-1/2 -mt-8 z-10 w-10 h-10 rounded-full bg-brand-panel border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-brand-gold transition-all md:-mr-5 lg:mr-0 shadow-lg">
                  <ChevronRight size={20} />
                </button>
                
                <div className="product-pagination flex justify-center gap-2 mt-4 custom-pagination"></div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
