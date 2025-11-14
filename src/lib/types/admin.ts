// Tipos para o painel administrativo

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
  createdAt: Date;
  lastAccess?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  lastAccess?: Date;
  ip?: string;
  status: 'new' | 'active' | 'vip' | 'blocked';
  tags: string[];
  role: 'user' | 'moderator' | 'admin';
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  receipt?: string;
  method: 'pix' | 'card' | 'boleto';
}

export interface DashboardStats {
  totalUsers: number;
  totalPaymentsApproved: number;
  totalPaymentsPending: number;
  totalReceivedToday: number;
  totalReceivedMonth: number;
  totalReceivedAll: number;
  averageTicket: number;
}

export interface SalesData {
  date: string;
  amount: number;
  count: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  pdfUrl?: string;
  order: number;
  duration?: number;
  views: number;
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: 'open' | 'answered' | 'resolved';
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'admin';
  message: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  targetUsers: 'all' | 'specific';
  userIds?: string[];
  scheduledFor?: Date;
  sentAt?: Date;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  expiresAt?: Date;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  trackingLink: string;
  clicks: number;
  conversions: number;
  revenue: number;
}
