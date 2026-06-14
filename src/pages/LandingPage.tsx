import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Courses from "../components/Courses";
import Products from "../components/Products";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-muted font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />
      <Hero />
      <Services />
      <Courses />
      <Products />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
