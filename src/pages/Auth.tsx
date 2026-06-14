import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, User, Lock, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName || 'بدون نام',
          email: result.user.email,
          role: 'user',
          createdAt: serverTimestamp()
        });
        navigate('/user');
      } else {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }
    } catch (err: any) {
      setError(err.message || 'خطا در ورود با گوگل');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Admin backend bypass for development (remove in prod)
    if (isLogin && identifier === 'admin@compass.com' && password === 'admin123') {
      try {
        await signInWithEmailAndPassword(auth, identifier, password);
        navigate('/admin');
      } catch (err) {
        setError('حساب ادمین باید در فایربیس ساخته شود. از ورود با گوگل استفاده کنید.');
      }
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, identifier, password);
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        const result = await createUserWithEmailAndPassword(auth, identifier, password);
        await updateProfile(result.user, { displayName: name });
        // Create user doc
        await setDoc(doc(db, 'users', result.user.uid), {
          name,
          email: identifier,
          mobile: phone,
          role: 'user',
          createdAt: serverTimestamp()
        });
        navigate('/user');
      }
    } catch (err: any) {
      setError(err.message || 'خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 relative overflow-hidden" dir="rtl">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-dark/5 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold-light/20 blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-5xl bg-white border border-brand-primary/10 rounded-3xl shadow-2xl flex overflow-hidden relative z-10">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <button onClick={() => navigate('/')} className="mb-12 flex items-center gap-2 text-brand-muted/50 hover:text-brand-primary transition-colors hover:gap-3 w-fit">
            <ArrowRight size={18} />
            <span className="text-sm font-bold">بازگشت به خانه</span>
          </button>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold mb-6 font-en tracking-widest uppercase shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></div>
              {isLogin ? 'Member Portal' : 'Join Us'}
            </div>
            <h2 className="text-3xl font-bold text-brand-primary font-serif mb-4">
              {isLogin ? 'ورود به حساب کاربری' : 'ثبت نام در کامپس'}
            </h2>
            <p className="text-brand-muted/70 text-sm leading-relaxed max-w-sm">
              {isLogin ? 'برای دسترسی به پنل کاربری اطلاعات خود را وارد کنید.' : 'به خانواده بزرگ کامپس بپیوندید و از آموزش‌ها و تجهیزات تخصصی بهره‌مند شوید.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold">{error}</div>}
            
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-white border-2 border-brand-light text-brand-primary flex gap-3 items-center justify-center rounded-2xl font-bold hover:bg-brand-light/50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="transparent" d="M1 1h22v22H1z" />
              </svg>
              Google ورود با حساب
            </button>
            <div className="flex items-center gap-4 py-2">
               <div className="flex-1 h-[1px] bg-brand-primary/10"></div>
               <span className="text-xs text-brand-muted/40 font-bold uppercase tracking-widest">OR</span>
               <div className="flex-1 h-[1px] bg-brand-primary/10"></div>
            </div>

            {!isLogin && (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="relative group">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted/40 group-focus-within:text-brand-gold transition-colors" size={20} />
                  <input type="text" placeholder="نام و نام خانوادگی" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-brand-light border border-brand-primary/10 rounded-2xl pr-12 pl-4 py-4 text-sm focus:outline-none focus:border-brand-gold focus:bg-white focus:shadow-lg transition-all text-brand-primary" />
                </div>
                <div className="relative group">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted/40 group-focus-within:text-brand-gold transition-colors" size={20} />
                  <input type="tel" dir="ltr" placeholder="شماره موبایل" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-brand-light border border-brand-primary/10 rounded-2xl pr-12 pl-4 py-4 text-sm focus:outline-none focus:border-brand-gold focus:bg-white focus:shadow-lg transition-all text-brand-primary font-en text-left" />
                </div>
              </div>
            )}

            <div className="relative group animate-in fade-in zoom-in-95 duration-500">
              {isLogin ? 
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted/40 group-focus-within:text-brand-gold transition-colors block" size={20} /> :
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted/40 group-focus-within:text-brand-gold transition-colors block" size={20} />
              }
              <input 
                type={isLogin ? "text" : "email"} 
                dir="ltr" 
                placeholder={isLogin ? 'ایمیل (یا نام کاربری)' : 'ایمیل'} 
                required 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-brand-light/50 border border-brand-primary/10 rounded-2xl pr-12 pl-4 py-4 text-sm focus:outline-none focus:border-brand-gold focus:bg-white focus:shadow-xl focus:shadow-brand-gold/10 transition-all duration-300 text-brand-primary font-en text-left" 
              />
            </div>
            
            <div className="relative group animate-in fade-in zoom-in-95 duration-500 delay-75">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted/40 group-focus-within:text-brand-gold transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                dir="ltr" 
                placeholder="رمز عبور" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-light/50 border border-brand-primary/10 rounded-2xl pr-12 pl-12 py-4 text-sm focus:outline-none focus:border-brand-gold focus:bg-white focus:shadow-xl focus:shadow-brand-gold/10 transition-all duration-300 text-brand-primary font-en text-left" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted/40 hover:text-brand-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 bg-brand-primary text-brand-gold rounded-2xl font-bold tracking-widest hover:bg-brand-gold hover:text-brand-primary shadow-xl shadow-brand-primary/20 hover:shadow-brand-gold/20 transition-all duration-300 mt-6 group">
              <span className="flex items-center justify-center gap-2">
                {loading ? 'در حال پردازش...' : (isLogin ? 'ورود به پنل' : 'ثبت نام و عضویت')}
                <ArrowRight size={18} className="translate-x-0 group-hover:-translate-x-1 pl-1 rotate-180 transition-transform" />
              </span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-brand-muted/60">
            {isLogin ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت نام کرده‌اید؟'}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setIdentifier('');
                setPassword('');
              }} 
              className="mr-2 font-bold text-brand-primary hover:text-brand-gold transition-colors"
            >
              {isLogin ? 'ثبت نام کنید' : 'وارد شوید'}
            </button>
          </div>
          
          <div className="mt-6 text-center text-xs text-brand-muted/40">
             <p className="mb-2"><strong>توجه مهم:</strong> برای ورود با ایمیل و رمز عبور (غیر از گوگل)، باید ابتدا در <a href="https://console.firebase.google.com" target="_blank" className="font-bold underline text-brand-primary">پنل فایربیس</a> Authentication با Email/Password را فعال کنید.</p>
          </div>
        </div>

        {/* Branding Section */}
        <div className="hidden lg:flex w-1/2 bg-[#0A0A0A] p-12 relative flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-50">
             <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1000&q=80" alt="Coffee Aesthetic" className="w-full h-full object-cover mix-blend-luminosity" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 border border-brand-gold/30 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm bg-black/40 text-brand-gold overflow-hidden">
               <img src="/compass.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            
            <h1 className="text-5xl font-en font-light tracking-[0.3em] text-white mb-6">COMPASS</h1>
            <p className="text-brand-gold/80 max-w-sm leading-loose font-serif text-lg">
              آکادمی و فروشگاه تخصصی قهوه کامپس
            </p>
            
            <div className="mt-16 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
              <div className="w-2 h-2 rounded-full bg-brand-gold/30"></div>
              <div className="w-2 h-2 rounded-full bg-brand-gold/30"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
