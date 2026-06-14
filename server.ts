import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Course, Product, TeamMember, Order, Registration } from "./src/types";

// Setup In-Memory Mock Database
const INITIAL_COURSES: Course[] = [
  {
    id: "c1",
    title: "باریستای پایه تا پیشرفته",
    instructor: "علی رضایی",
    date: "۱۵ مهر ۱۴۰۳",
    price: 3500000,
    capacity: 10,
    enrolled: 6,
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    description: "آموزش کامل مهارت‌های باریستا از شناخت دانه قهوه تا عصاره‌گیری و لاته آرت"
  },
  {
    id: "c2",
    title: "مدیریت و راه‌اندازی کافه",
    instructor: "محمد حسینی",
    date: "۲۲ مهر ۱۴۰۳",
    price: 5500000,
    capacity: 15,
    enrolled: 15,
    imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
    description: "دانش مورد نیاز برای مدیریت حرفه‌ای کافه و محاسبه هزینه و درآمد (Food Cost)"
  }
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "قهوه عربیکا اسپشیالتی (۱ کیلویی)",
    category: "consumables",
    price: 1200000,
    imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80",
    description: "ترکیب ۱۰۰٪ عربیکا با رست مدیوم دارک، اسیدیته ملایم",
    inStock: true
  },
  {
    id: "p1-2",
    title: "دانه قهوه اتیوپی یرگاچف (۲۵۰ گرمی)",
    category: "consumables",
    price: 450000,
    imageUrl: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&q=80",
    description: "قهوه تخصصی سینگل اوریجین با طعم‌یادهای گلی و مرکبات",
    inStock: true
  },
  {
    id: "p1-3",
    title: "پودر کاکائو هلندی",
    category: "consumables",
    price: 320000,
    imageUrl: "https://images.unsplash.com/photo-1548842221-d14fb96a0b16?w=800&q=80",
    description: "پودر کاکائو پریمیوم برای تهیه موکا و هات چاکلت",
    inStock: true
  },
  {
    id: "p2",
    title: "تمپر حرفه‌ای سایز ۵۸mm",
    category: "accessories",
    price: 850000,
    imageUrl: "https://images.unsplash.com/photo-1505353594098-f2b1d68351ba?w=800&q=80",
    description: "تمپر استیل ضد زنگ با دسته چوبی ارگونومیک",
    inStock: true
  },
  {
    id: "p2-2",
    title: "پیچر شیر تفلون (۶۰۰ میلی‌لیتر)",
    category: "accessories",
    price: 650000,
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80",
    description: "پیچر تخصصی لاته آرت با لبه باریک و وزن ایده‌آل",
    inStock: true
  },
  {
    id: "p2-3",
    title: "ترازوی دیجیتال تایمور",
    category: "accessories",
    price: 3400000,
    imageUrl: "https://images.unsplash.com/photo-1627844055271-e7cf7b3d11b2?w=800&q=80",
    description: "ترازوی دقیق با سنسور هوشمند برای دم‌آوری V60",
    inStock: false
  },
  {
    id: "p3",
    title: "اسپرسو ماشین La Marzocco",
    category: "equipment",
    price: 450000000,
    imageUrl: "https://images.unsplash.com/photo-1585202685764-f651cc4b66ad?w=800&q=80",
    description: "ماشین اسپرسوساز دو گروپ مدل Linea Classic",
    inStock: false
  },
  {
    id: "p3-2",
    title: "آسیاب قهوه صنعتی Mahlkönig E65S",
    category: "equipment",
    price: 180000000,
    imageUrl: "https://images.unsplash.com/photo-1614264627448-c89b3ab60efd?w=800&q=80",
    description: "آسیاب پیشرفته با دقت بسیار بالا و سرعت بی‌نظیر",
    inStock: true
  },
  {
    id: "p3-3",
    title: "دستگاه V60 شیشه‌ای هاریو",
    category: "equipment",
    price: 1200000,
    imageUrl: "https://images.unsplash.com/photo-1544256425-c6198fdfc026?w=800&q=80",
    description: "دم‌ابزار پوراور با طراحی کلاسیک برای عصاره‌گیری شفاف",
    inStock: true
  }
];

const INITIAL_TEAM: TeamMember[] = [
  {
    id: "t1",
    name: "امیر بیات",
    role: "موسس و مدیر عامل",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80"
  },
  {
    id: "t2",
    name: "سارا نیکزاد",
    role: "مدیر دپارتمان آموزش",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    id: "t3",
    name: "کامیار احمدی",
    role: "سرپرست مشاوران راه اندازی",
    imageUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80"
  }
];

const INITIAL_ORDERS: Order[] = [];
const INITIAL_REGISTRATIONS: Registration[] = [];

let db = {
  courses: [...INITIAL_COURSES],
  products: [...INITIAL_PRODUCTS],
  team: [...INITIAL_TEAM],
  orders: [...INITIAL_ORDERS],
  registrations: [...INITIAL_REGISTRATIONS]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  
  // -- Courses
  app.get("/api/courses", (req, res) => {
    res.json(db.courses);
  });
  app.post("/api/courses", (req, res) => {
    const newCourse = { ...req.body, id: Math.random().toString(36).substring(7) };
    db.courses.push(newCourse);
    res.json(newCourse);
  });
  
  // -- Products
  app.get("/api/products", (req, res) => {
    res.json(db.products);
  });

  // -- Team
  app.get("/api/team", (req, res) => {
    res.json(db.team);
  });

  // -- Registrations
  app.post("/api/registrations", (req, res) => {
    const reg = { ...req.body, id: Math.random().toString(36).substring(7), status: 'pending', date: new Date().toISOString() };
    db.registrations.push(reg);
    res.json({ message: "Registration successful", data: reg });
  });
  app.get("/api/registrations", (req, res) => {
    res.json(db.registrations);
  });

  // -- Orders
  app.post("/api/orders", (req, res) => {
    const order = { ...req.body, id: Math.random().toString(36).substring(7), status: 'pending', date: new Date().toISOString() };
    db.orders.push(order);
    res.json({ message: "Order placed successfully", data: order });
  });
  app.get("/api/orders", (req, res) => {
    res.json(db.orders);
  });

    // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving - مسیر درست برای Render
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // تمام درخواست‌های دیگر به index.html هدایت شوند
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
