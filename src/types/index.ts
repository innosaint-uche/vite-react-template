export type UserRole = 'customer' | 'lawyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface Customer extends User {
  role: 'customer';
  subscription?: Subscription;
  cases: Case[];
  kycVerified: boolean;
}

export interface Lawyer extends User {
  role: 'lawyer';
  barNumber: string;
  specializations: string[];
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  available: boolean;
  location: string;
  bio: string;
  completedCases: number;
  earnings: number;
}

export interface Subscription {
  id: string;
  plan: 'basic' | 'standard' | 'premium';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  coverageAreas: string[];
  amount: number;
}

export interface Case {
  id: string;
  title: string;
  type: CaseType;
  status: CaseStatus;
  customerId: string;
  customerName: string;
  lawyerId?: string;
  lawyerName?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
  amount?: number;
  paymentStatus: 'pending' | 'paid' | 'escrowed' | 'released';
  serviceType: 'insurance' | 'immediate';
  documents: Document[];
  messages: Message[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export type CaseType = 'housing' | 'divorce' | 'employment' | 'law_enforcement' | 'registration' | 'trademark' | 'copyright' | 'consultancy' | 'other';

export type CaseStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  sentAt: string;
  read: boolean;
}

export interface Payment {
  id: string;
  caseId?: string;
  subscriptionId?: string;
  customerId: string;
  customerName: string;
  lawyerId?: string;
  amount: number;
  type: 'subscription' | 'immediate' | 'escrow_release';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference: string;
  createdAt: string;
  gateway: 'paystack' | 'flutterwave' | 'bank_transfer';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  coverImage: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'case' | 'payment' | 'lawyer' | 'system' | 'promotion';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface AnalyticsSummary {
  totalUsers: number;
  totalLawyers: number;
  totalCases: number;
  totalRevenue: number;
  activeSubscriptions: number;
  pendingVerifications: number;
  casesByType: Record<string, number>;
  revenueByMonth: { month: string; revenue: number; cases: number }[];
  userGrowth: { month: string; users: number; lawyers: number }[];
  caseStatusBreakdown: { status: string; count: number }[];
}
