import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { TeamMember } from "../types";
import { Linkedin, Instagram } from "lucide-react";

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    axios.get("/api/team").then(res => {
      if (Array.isArray(res.data)) {
        setTeam(res.data);
      } else {
        console.error("Expected array from /api/team, got:", res.data);
        setTeam([]);
      }
    });
  }, []);

  return (
    <section id="team" className="py-32 bg-brand-light border-y border-brand-primary/10 text-brand-muted overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-brand-gold-light/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 flex flex-col items-center">
          <h2 className="text-[10px] font-en tracking-[0.4em] text-brand-gold font-medium mb-6 uppercase">The Architects</h2>
          <h3 className="text-4xl md:text-5xl font-bold font-serif mb-8 text-brand-primary">تیم متخصص کامپس</h3>
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent"></div>
        </div>

        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-16 px-4 !overflow-visible"
        >
          {team.map(member => (
            <SwiperSlide key={member.id}>
              <div className="flex flex-col items-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border border-brand-primary/10 relative cursor-pointer bg-brand-panel shadow-sm group-hover:border-brand-gold transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-xl">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                  
                  <div className="absolute inset-0 bg-brand-primary-light/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]">
                    <Linkedin size={24} strokeWidth={1.5} className="text-white hover:text-brand-gold-light transition-colors hover:scale-110" />
                    <Instagram size={24} strokeWidth={1.5} className="text-white hover:text-brand-gold-light transition-colors hover:scale-110" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-brand-primary mb-3 font-serif tracking-wide">{member.name}</h4>
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] font-en">{member.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
