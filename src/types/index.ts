export interface Course {
  id: string;
  title: string;
  instructor: string;
  date: string;
  price: number;
  capacity: number;
  enrolled: number;
  imageUrl: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'consumables' | 'accessories' | 'equipment';
  price: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  linkedin?: string;
  instagram?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerMobile: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  date: string;
}

export interface Registration {
  id: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  courseId: string;
  date: string;
  status: 'pending' | 'approved' | 'cancelled';
}
