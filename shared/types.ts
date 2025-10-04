export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth Types
export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: 'member' | 'employer';
}

// Employee Types
export interface MemberSummary {
  id: string;
  name: string;
  totalBalance: number;
  ytdReturn: number; // percentage
  lastContributionDate: string; // ISO 8601
  performanceData: { date: string; value: number }[];
}
export interface Contribution {
  id: string;
  date: string; // ISO 8601
  employeeAmount: number;
  employerAmount: number;
  totalAmount: number;
}
export interface InvestmentFund {
  id: string;
  name: string;
  category: 'Equity' | 'Bond' | 'Mixed Asset' | 'Money Market';
  riskLevel: 'Low' | 'Medium' | 'High';
  ytdPerformance: number; // percentage
}
export type PortfolioAllocation = Record<string, number>; // Maps fundId to percentage
// Employer Types
export interface EmployerSummary {
  id: string;
  companyName: string;
  totalContributionCurrentPeriod: number;
  activeEmployees: number;
  nextContributionDeadline: string; // ISO 8601
}
export interface ManagedEmployee {
  id: string;
  name: string;
  status: 'Active' | 'Terminated';
  lastContributionDate: string; // ISO 8601
  totalBalance: number;
}
export interface ContributionPeriod {
  id: string;
  period: string; // e.g., "May 2024"
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate?: string; // ISO 8601
}