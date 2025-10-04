import { MemberSummary, Contribution, InvestmentFund, PortfolioAllocation, EmployerSummary, ManagedEmployee, ContributionPeriod } from './types';
import { subMonths, formatISO, format, addDays } from 'date-fns';
// --- Employee Mock Data ---
export const MOCK_MEMBER_SUMMARY: MemberSummary = {
  id: 'EMP001',
  name: 'Alex Chan',
  totalBalance: 485230.75,
  ytdReturn: 7.8,
  lastContributionDate: formatISO(subMonths(new Date(), 1)),
  performanceData: [
    { date: formatISO(subMonths(new Date(), 11)), value: 420000 },
    { date: formatISO(subMonths(new Date(), 10)), value: 425000 },
    { date: formatISO(subMonths(new Date(), 9)), value: 435000 },
    { date: formatISO(subMonths(new Date(), 8)), value: 430000 },
    { date: formatISO(subMonths(new Date(), 7)), value: 445000 },
    { date: formatISO(subMonths(new Date(), 6)), value: 450000 },
    { date: formatISO(subMonths(new Date(), 5)), value: 460000 },
    { date: formatISO(subMonths(new Date(), 4)), value: 475000 },
    { date: formatISO(subMonths(new Date(), 3)), value: 470000 },
    { date: formatISO(subMonths(new Date(), 2)), value: 480000 },
    { date: formatISO(subMonths(new Date(), 1)), value: 482000 },
    { date: formatISO(new Date()), value: 485230.75 },
  ],
};
export const MOCK_CONTRIBUTIONS: Contribution[] = Array.from({ length: 24 }).map((_, i) => {
  const date = subMonths(new Date(), i + 1);
  const employeeAmount = 1500;
  const employerAmount = 1500;
  return {
    id: `C${24 - i}`,
    date: formatISO(date),
    employeeAmount,
    employerAmount,
    totalAmount: employeeAmount + employerAmount,
  };
});
export const MOCK_FUNDS: InvestmentFund[] = [
  { id: 'F001', name: 'Global Equity Fund', category: 'Equity', riskLevel: 'High', ytdPerformance: 12.5 },
  { id: 'F002', name: 'Hong Kong Bond Fund', category: 'Bond', riskLevel: 'Low', ytdPerformance: 3.2 },
  { id: 'F003', name: 'Asia Pacific Balanced Fund', category: 'Mixed Asset', riskLevel: 'Medium', ytdPerformance: 8.1 },
  { id: 'F004', name: 'Conservative Growth Fund', category: 'Money Market', riskLevel: 'Low', ytdPerformance: 1.5 },
];
export const MOCK_PORTFOLIO: PortfolioAllocation = {
  'F001': 60,
  'F002': 15,
  'F003': 25,
};
// --- Employer Mock Data ---
export const MOCK_EMPLOYER_SUMMARY: EmployerSummary = {
  id: 'BIZ001',
  companyName: 'Cloudflare HK',
  totalContributionCurrentPeriod: 75000,
  activeEmployees: 25,
  nextContributionDeadline: formatISO(addDays(new Date(), 10)),
};
export const MOCK_MANAGED_EMPLOYEES: ManagedEmployee[] = [
  { id: 'EMP001', name: 'Alex Chan', status: 'Active', lastContributionDate: formatISO(subMonths(new Date(), 1)), totalBalance: 485230.75 },
  { id: 'EMP002', name: 'Betty Wong', status: 'Active', lastContributionDate: formatISO(subMonths(new Date(), 1)), totalBalance: 321450.20 },
  { id: 'EMP003', name: 'Charlie Lee', status: 'Active', lastContributionDate: formatISO(subMonths(new Date(), 1)), totalBalance: 150300.00 },
  { id: 'EMP004', name: 'David Ng', status: 'Terminated', lastContributionDate: formatISO(subMonths(new Date(), 3)), totalBalance: 98760.50 },
  { id: 'EMP005', name: 'Emily Tam', status: 'Active', lastContributionDate: formatISO(subMonths(new Date(), 1)), totalBalance: 560800.90 },
];
export const MOCK_CONTRIBUTION_PERIODS: ContributionPeriod[] = Array.from({ length: 12 }).map((_, i) => {
  const date = subMonths(new Date(), i + 1);
  return {
    id: `P${12 - i}`,
    period: format(date, 'MMMM yyyy'),
    amount: 75000,
    status: 'Paid',
    paymentDate: formatISO(date),
  };
});
MOCK_CONTRIBUTION_PERIODS[0].status = 'Pending';
delete MOCK_CONTRIBUTION_PERIODS[0].paymentDate;