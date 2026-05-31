import type { Customer, Lawyer, Case, Payment, BlogPost, Notification, AnalyticsSummary, Subscription } from '../types';

export const COVERAGE_AREAS = [
  { id: 'housing', label: 'Housing', icon: '🏠', description: 'Tenancy, eviction, property disputes' },
  { id: 'divorce', label: 'Divorce & Family', icon: '👨‍👩‍👧', description: 'Divorce, custody, family law' },
  { id: 'employment', label: 'Employment', icon: '💼', description: 'Wrongful termination, contracts, labour' },
  { id: 'law_enforcement', label: 'Law Enforcement', icon: '⚖️', description: 'Police matters, arrests, rights' },
  { id: 'registration', label: 'Business Registration', icon: '🏢', description: 'CAC registration, compliance' },
  { id: 'trademark', label: 'Trademark', icon: '™️', description: 'Brand protection, IP registration' },
  { id: 'copyright', label: 'Copyright', icon: '©️', description: 'Creative rights, infringement' },
  { id: 'consultancy', label: 'Legal Consultancy', icon: '📋', description: 'General legal advisory' },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 10000,
    period: 'quarter',
    annualPrice: 40000,
    features: [
      '1 Coverage Area',
      'Virtual Consultancy (2hrs/month)',
      'Legal Knowledge Access',
      'Emergency Call Button',
      'Email Support',
    ],
    coverageAreas: 1,
    color: 'gray',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 20000,
    period: 'quarter',
    annualPrice: 70000,
    features: [
      '3 Coverage Areas',
      'Virtual Consultancy (5hrs/month)',
      'Legal Knowledge Access',
      'Emergency Call Button',
      'Priority Support',
      'Document Review (5 docs/month)',
      'Geo Lawyer Locator',
    ],
    coverageAreas: 3,
    color: 'orange',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 35000,
    period: 'quarter',
    annualPrice: 120000,
    features: [
      'All Coverage Areas',
      'Unlimited Consultancy',
      'Full Representation Coverage',
      'Emergency Call Button',
      '24/7 Priority Support',
      'Unlimited Document Review',
      'Dedicated Lawyer Assignment',
      'Escrow Payment Protection',
    ],
    coverageAreas: 8,
    color: 'dark',
    popular: false,
  },
];

export const mockLawyers: Lawyer[] = [
  {
    id: 'l1', name: 'Adaeze Okonkwo', email: 'adaeze@legali.ng', phone: '080-1234-5678',
    role: 'lawyer', barNumber: 'NBA-2018-LG-04521', specializations: ['Housing', 'Employment', 'Family Law'],
    yearsExperience: 8, rating: 4.9, reviewCount: 142, verified: true, available: true,
    location: 'Lagos Island, Lagos', bio: 'Senior litigation attorney with expertise in tenant rights and employment disputes.',
    completedCases: 312, earnings: 4800000, status: 'active', createdAt: '2023-01-15',
    avatar: 'https://ui-avatars.com/api/?name=Adaeze+Okonkwo&background=E05A00&color=fff'
  },
  {
    id: 'l2', name: 'Emeka Nwosu', email: 'emeka@legali.ng', phone: '080-2345-6789',
    role: 'lawyer', barNumber: 'NBA-2015-LG-02341', specializations: ['Corporate', 'Trademark', 'Copyright'],
    yearsExperience: 12, rating: 4.8, reviewCount: 98, verified: true, available: true,
    location: 'Victoria Island, Lagos', bio: 'Corporate lawyer specializing in intellectual property and business registration.',
    completedCases: 445, earnings: 7200000, status: 'active', createdAt: '2023-02-20',
    avatar: 'https://ui-avatars.com/api/?name=Emeka+Nwosu&background=1A1A1A&color=fff'
  },
  {
    id: 'l3', name: 'Fatima Hassan', email: 'fatima@legali.ng', phone: '080-3456-7890',
    role: 'lawyer', barNumber: 'NBA-2020-AB-06789', specializations: ['Family Law', 'Divorce', 'Custody'],
    yearsExperience: 5, rating: 4.7, reviewCount: 67, verified: true, available: false,
    location: 'Garki, Abuja', bio: 'Family law specialist with a compassionate approach to sensitive cases.',
    completedCases: 189, earnings: 2900000, status: 'active', createdAt: '2023-03-10',
    avatar: 'https://ui-avatars.com/api/?name=Fatima+Hassan&background=E05A00&color=fff'
  },
  {
    id: 'l4', name: 'Chukwuemeka Obi', email: 'cemeka@legali.ng', phone: '080-4567-8901',
    role: 'lawyer', barNumber: 'NBA-2016-RV-03892', specializations: ['Criminal Law', 'Law Enforcement', 'Rights'],
    yearsExperience: 10, rating: 4.9, reviewCount: 201, verified: true, available: true,
    location: 'Port Harcourt, Rivers', bio: 'Criminal defense attorney. Former public defender with extensive courtroom experience.',
    completedCases: 567, earnings: 9100000, status: 'active', createdAt: '2022-11-05',
    avatar: 'https://ui-avatars.com/api/?name=Chukwuemeka+Obi&background=1A1A1A&color=fff'
  },
  {
    id: 'l5', name: 'Yewande Adeyemi', email: 'yewande@legali.ng', phone: '080-5678-9012',
    role: 'lawyer', barNumber: 'NBA-2019-OY-05123', specializations: ['Employment', 'Labour', 'Contracts'],
    yearsExperience: 6, rating: 4.6, reviewCount: 54, verified: false, available: true,
    location: 'Ibadan, Oyo', bio: 'Labour and employment specialist helping workers and employers navigate workplace disputes.',
    completedCases: 134, earnings: 2100000, status: 'pending', createdAt: '2024-01-08',
    avatar: 'https://ui-avatars.com/api/?name=Yewande+Adeyemi&background=E05A00&color=fff'
  },
];

export const mockCases: Case[] = [
  {
    id: 'c1', title: 'Unlawful Eviction — Lagos Mainland Property',
    type: 'housing', status: 'in_progress', customerId: 'u1', customerName: 'Tunde Bakare',
    lawyerId: 'l1', lawyerName: 'Adaeze Okonkwo', priority: 'high',
    description: 'Landlord attempting to evict tenant without proper notice or court order.',
    createdAt: '2025-01-15', updatedAt: '2025-01-28', scheduledAt: '2025-02-05',
    amount: 50000, paymentStatus: 'escrowed', serviceType: 'immediate',
    documents: [{ id: 'd1', name: 'Tenancy Agreement.pdf', url: '#', type: 'pdf', uploadedAt: '2025-01-15', uploadedBy: 'u1' }],
    messages: []
  },
  {
    id: 'c2', title: 'Trademark Registration — Brand Name Protection',
    type: 'trademark', status: 'completed', customerId: 'u2', customerName: 'Ngozi Eze',
    lawyerId: 'l2', lawyerName: 'Emeka Nwosu', priority: 'medium',
    description: 'Register trademark for new fashion brand "Aso-Chic" in Nigeria.',
    createdAt: '2025-01-08', updatedAt: '2025-01-22', amount: 50000,
    paymentStatus: 'released', serviceType: 'immediate',
    documents: [], messages: []
  },
  {
    id: 'c3', title: 'Wrongful Termination — Tech Company',
    type: 'employment', status: 'assigned', customerId: 'u3', customerName: 'Segun Adeola',
    lawyerId: 'l1', lawyerName: 'Adaeze Okonkwo', priority: 'urgent',
    description: 'Dismissed without cause after whistleblowing on financial irregularities.',
    createdAt: '2025-01-25', updatedAt: '2025-01-28', scheduledAt: '2025-02-02',
    amount: 50000, paymentStatus: 'paid', serviceType: 'immediate',
    documents: [], messages: []
  },
  {
    id: 'c4', title: 'Police Brutality — Harassment Complaint',
    type: 'law_enforcement', status: 'pending', customerId: 'u4', customerName: 'Amara Okafor',
    priority: 'urgent',
    description: 'Unlawful arrest and harassment at a checkpoint. Seeking legal redress.',
    createdAt: '2025-01-29', updatedAt: '2025-01-29',
    amount: 50000, paymentStatus: 'pending', serviceType: 'immediate',
    documents: [], messages: []
  },
  {
    id: 'c5', title: 'Divorce Proceedings — Mutual Consent',
    type: 'divorce', status: 'in_progress', customerId: 'u5', customerName: 'Bisi Olawale',
    lawyerId: 'l3', lawyerName: 'Fatima Hassan', priority: 'medium',
    description: 'Mutual divorce with custody arrangement for two children.',
    createdAt: '2025-01-10', updatedAt: '2025-01-27',
    amount: 50000, paymentStatus: 'escrowed', serviceType: 'insurance',
    documents: [], messages: []
  },
];

export const mockPayments: Payment[] = [
  { id: 'p1', caseId: 'c1', customerId: 'u1', customerName: 'Tunde Bakare', lawyerId: 'l1', amount: 50000, type: 'immediate', status: 'completed', reference: 'LGL-2025-001', createdAt: '2025-01-15', gateway: 'paystack' },
  { id: 'p2', subscriptionId: 's1', customerId: 'u2', customerName: 'Ngozi Eze', amount: 40000, type: 'subscription', status: 'completed', reference: 'LGL-2025-002', createdAt: '2025-01-01', gateway: 'flutterwave' },
  { id: 'p3', caseId: 'c3', customerId: 'u3', customerName: 'Segun Adeola', lawyerId: 'l1', amount: 50000, type: 'immediate', status: 'completed', reference: 'LGL-2025-003', createdAt: '2025-01-25', gateway: 'paystack' },
  { id: 'p4', subscriptionId: 's2', customerId: 'u6', customerName: 'Kemi Abiodun', amount: 70000, type: 'subscription', status: 'completed', reference: 'LGL-2025-004', createdAt: '2025-01-03', gateway: 'paystack' },
  { id: 'p5', caseId: 'c4', customerId: 'u4', customerName: 'Amara Okafor', lawyerId: 'l4', amount: 50000, type: 'immediate', status: 'pending', reference: 'LGL-2025-005', createdAt: '2025-01-29', gateway: 'paystack' },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'b1', title: "Know Your Rights: What To Do When Arrested In Nigeria",
    slug: 'know-your-rights-arrested-nigeria',
    excerpt: 'Understanding your constitutional rights during police encounters can make the difference between justice and injustice.',
    content: '...', category: "Law Enforcement", tags: ['rights', 'police', 'arrest'],
    author: 'Adaeze Okonkwo', publishedAt: '2025-01-20', readTime: 5, featured: true,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'b2', title: "Tenant Rights in Nigeria: Everything You Need to Know",
    slug: 'tenant-rights-nigeria-guide',
    excerpt: 'A comprehensive guide to your rights as a tenant in Nigeria and how to protect yourself from unlawful eviction.',
    content: '...', category: "Housing", tags: ['tenant', 'housing', 'rights'],
    author: 'Emeka Nwosu', publishedAt: '2025-01-15', readTime: 7, featured: true,
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'b3', title: "How To Register Your Business in Nigeria in 2025",
    slug: 'register-business-nigeria-2025',
    excerpt: 'Step-by-step guide to CAC registration, including new digital processes and requirements.',
    content: '...', category: "Business", tags: ['CAC', 'registration', 'business'],
    author: 'Emeka Nwosu', publishedAt: '2025-01-10', readTime: 6, featured: false,
    coverImage: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'b4', title: "Divorce in Nigeria: Legal Process, Timeline & Costs",
    slug: 'divorce-nigeria-legal-process',
    excerpt: 'Everything you need to know about the divorce process in Nigeria, from filing to finalization.',
    content: '...', category: "Family Law", tags: ['divorce', 'family', 'marriage'],
    author: 'Fatima Hassan', publishedAt: '2025-01-05', readTime: 8, featured: false,
    coverImage: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800&auto=format&fit=crop&q=60'
  },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', title: 'Lawyer Assigned', message: 'Adaeze Okonkwo has been assigned to your case.', type: 'case', read: false, createdAt: '2025-01-28T10:30:00Z', link: '/customer/cases/c1' },
  { id: 'n2', userId: 'u1', title: 'Payment Confirmed', message: 'Your payment of ₦50,000 has been received and held in escrow.', type: 'payment', read: false, createdAt: '2025-01-15T14:00:00Z' },
  { id: 'n3', userId: 'u1', title: 'Case Update', message: 'Your lawyer has uploaded new documents to your case.', type: 'case', read: true, createdAt: '2025-01-20T09:15:00Z' },
  { id: 'n4', userId: 'u1', title: '🎉 Special Offer', message: 'Get 20% off your first subscription with code: LEGALI20', type: 'promotion', read: false, createdAt: '2025-01-01T08:00:00Z' },
];

export const mockAnalytics: AnalyticsSummary = {
  totalUsers: 1847,
  totalLawyers: 234,
  totalCases: 3421,
  totalRevenue: 187500000,
  activeSubscriptions: 892,
  pendingVerifications: 17,
  casesByType: {
    housing: 812, divorce: 541, employment: 678, law_enforcement: 445,
    trademark: 234, copyright: 189, registration: 312, consultancy: 210
  },
  revenueByMonth: [
    { month: 'Aug', revenue: 8200000, cases: 189 },
    { month: 'Sep', revenue: 11400000, cases: 234 },
    { month: 'Oct', revenue: 14200000, cases: 312 },
    { month: 'Nov', revenue: 18700000, cases: 389 },
    { month: 'Dec', revenue: 16800000, cases: 341 },
    { month: 'Jan', revenue: 24100000, cases: 456 },
  ],
  userGrowth: [
    { month: 'Aug', users: 412, lawyers: 67 },
    { month: 'Sep', users: 634, lawyers: 89 },
    { month: 'Oct', users: 891, lawyers: 112 },
    { month: 'Nov', users: 1124, lawyers: 156 },
    { month: 'Dec', users: 1456, lawyers: 198 },
    { month: 'Jan', users: 1847, lawyers: 234 },
  ],
  caseStatusBreakdown: [
    { status: 'Completed', count: 1892 },
    { status: 'In Progress', count: 823 },
    { status: 'Pending', count: 412 },
    { status: 'Assigned', count: 234 },
    { status: 'Cancelled', count: 60 },
  ],
};

export const currentCustomer: Customer = {
  id: 'u1', name: 'Tunde Bakare', email: 'tunde@example.com', phone: '0801-234-5678',
  role: 'customer', status: 'active', createdAt: '2024-12-01', kycVerified: true,
  avatar: 'https://ui-avatars.com/api/?name=Tunde+Bakare&background=E05A00&color=fff',
  cases: mockCases,
  subscription: {
    id: 's1', plan: 'standard', startDate: '2025-01-01', endDate: '2025-12-31',
    status: 'active', coverageAreas: ['housing', 'employment', 'law_enforcement'], amount: 70000
  }
};

export const currentLawyer: Lawyer = mockLawyers[0];

export const CASE_TYPE_LABELS: Record<string, string> = {
  housing: 'Housing', divorce: 'Divorce & Family', employment: 'Employment',
  law_enforcement: 'Law Enforcement', registration: 'Business Registration',
  trademark: 'Trademark', copyright: 'Copyright', consultancy: 'Consultancy', other: 'Other'
};

export const NIGERIAN_STATES = ['Lagos', 'Abuja (FCT)', 'Ogun', 'Oyo', 'Rivers', 'Delta', 'Kano', 'Kaduna', 'Enugu', 'Anambra'];
