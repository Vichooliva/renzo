export interface User {
  _id?: string;
  email: string;
  name: string;
  role: 'admin' | 'lawyer' | 'user';
  department?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LegalConsultation {
  _id?: string;
  userId: string;
  question: string;
  response?: string;
  category: 'laboral' | 'comercial' | 'tributario' | 'corporativo' | 'otros';
  status: 'pending' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Contract {
  _id?: string;
  title: string;
  type: 'compra' | 'venta' | 'servicio' | 'laboral' | 'confidencialidad' | 'otros';
  status: 'draft' | 'review' | 'approved' | 'signed' | 'expired';
  assignedTo?: string;
  client?: string;
  value?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  documents?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LegalNews {
  _id?: string;
  title: string;
  content: string;
  category: 'laboral' | 'tributario' | 'comercial' | 'corporativo' | 'regulatorio';
  source?: string;
  url?: string;
  publishedAt: Date;
  tags?: string[];
  saved?: boolean;
  createdAt?: Date;
}

export interface DashboardStats {
  totalConsultations: number;
  pendingConsultations: number;
  totalContracts: number;
  contractsInReview: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  _id?: string;
  type: 'consultation' | 'contract' | 'news' | 'user';
  action: string;
  description: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  roles: string[];
  color: string;
}