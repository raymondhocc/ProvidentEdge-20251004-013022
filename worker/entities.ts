import { IndexedEntity } from "./core-utils";
import type { MemberSummary, Contribution, InvestmentFund, PortfolioAllocation, EmployerSummary, ManagedEmployee, ContributionPeriod } from "@shared/types";
import { MOCK_MEMBER_SUMMARY, MOCK_CONTRIBUTIONS, MOCK_FUNDS, MOCK_PORTFOLIO, MOCK_EMPLOYER_SUMMARY, MOCK_MANAGED_EMPLOYEES, MOCK_CONTRIBUTION_PERIODS } from "@shared/mock-data";
// --- Member Entity ---
type MemberData = {
  id: string;
  summary: MemberSummary;
  contributions: Contribution[];
  portfolio: PortfolioAllocation;
};
export class MemberEntity extends IndexedEntity<MemberData> {
  static readonly entityName = "member";
  static readonly indexName = "members";
  static readonly initialState: MemberData = { id: "", summary: {} as MemberSummary, contributions: [], portfolio: {} };
  static seedData = [{
    id: MOCK_MEMBER_SUMMARY.id,
    summary: MOCK_MEMBER_SUMMARY,
    contributions: MOCK_CONTRIBUTIONS,
    portfolio: MOCK_PORTFOLIO,
  }];
}
// --- Investment Fund Entity ---
export class InvestmentFundEntity extends IndexedEntity<InvestmentFund> {
  static readonly entityName = "fund";
  static readonly indexName = "funds";
  static readonly initialState: InvestmentFund = { id: "", name: "", category: 'Equity', riskLevel: 'Low', ytdPerformance: 0 };
  static seedData = MOCK_FUNDS;
}
// --- Employer Entity ---
type EmployerData = {
  id: string;
  summary: EmployerSummary;
  employees: ManagedEmployee[];
  periods: ContributionPeriod[];
};
export class EmployerEntity extends IndexedEntity<EmployerData> {
  static readonly entityName = "employer";
  static readonly indexName = "employers";
  static readonly initialState: EmployerData = { id: "", summary: {} as EmployerSummary, employees: [], periods: [] };
  static seedData = [{
    id: MOCK_EMPLOYER_SUMMARY.id,
    summary: MOCK_EMPLOYER_SUMMARY,
    employees: MOCK_MANAGED_EMPLOYEES,
    periods: MOCK_CONTRIBUTION_PERIODS,
  }];
}