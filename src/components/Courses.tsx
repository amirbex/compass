import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../types";
import { Calendar, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/courses")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          console.error("Expected array from /api/courses, got:", res.data);
          setCourses([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="courses" className="py-32 bg-white relative text-brand-muted border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-[10px] font-en tracking-[0.4em] text-brand-gold font-medium mb-6 uppercase">Education</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-serif text-brand-primary">آکادمی کامپس</h3>
          </div>
          <p className="text-brand-muted/70 max-w-md text-sm leading-loose font-light text-justify md:text-right border-l md:border-l-0 md:border-r border-brand-gold/30 pl-4 md:pl-0 md:pr-6 py-2">
            دوره‌های تخصصی عملی و تئوری برای ارتقاء دانش و مهارت هنر میزبانی و تهیه قهوه، با ارائه گواهینامه‌های معتبر بین‌المللی.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-t-2 border-brand-gold animate-spin rounded-full"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white border text-brand-muted border-transparent flex flex-col group hover:border-brand-gold/30 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 rounded-3xl overflow-hidden relative">
                <div className="relative h-64 overflow-hidden m-2 rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase font-bold text-brand-primary tracking-widest font-en shadow-lg rounded-full">
                    {course.price.toLocaleString("fa-IR")} تومان
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1 relative z-20">
                  <h4 className="text-2xl font-bold mb-3 font-serif text-brand-primary group-hover:text-brand-gold transition-colors duration-300">{course.title}</h4>
                  <p className="text-brand-muted/70 text-sm mb-6 line-clamp-2 font-light leading-relaxed">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-y-4 mb-8 text-xs text-brand-muted/80 font-light">
                    <div className="flex justify-start items-center gap-2">
                       <User size={14} className="text-brand-gold" />
                       <span className="truncate">{course.instructor}</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                       <Calendar size={14} className="text-brand-gold" />
                       <span className="font-en truncate">{course.date}</span>
                    </div>
                    <div className="col-span-full flex justify-start items-center gap-2 bg-brand-light px-3 py-2 rounded-lg mt-2 font-sans border border-brand-primary/5">
                       <Users size={14} className="text-brand-gold" />
                       <span className="font-bold text-brand-primary">{course.capacity - course.enrolled}</span> <span className="text-[10px]">نفر باقیمانده</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button onClick={() => navigate('/auth')} className="w-full py-4 bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-brand-gold transition-all duration-500 font-bold tracking-[0.1em] text-[11px] flex items-center justify-center gap-2 rounded-xl">
                       مشاهده و ثبت‌نام
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
