import { Hono } from "hono";
import type { Env } from './core-utils';
import { MemberEntity, InvestmentFundEntity, EmployerEntity } from "./entities";
import { ok, notFound } from './core-utils';
import { MOCK_MEMBER_SUMMARY, MOCK_EMPLOYER_SUMMARY } from "@shared/mock-data";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Seed data on first request in a dev environment
  app.use('/api/*', async (c, next) => {
    await MemberEntity.ensureSeed(c.env);
    await InvestmentFundEntity.ensureSeed(c.env);
    await EmployerEntity.ensureSeed(c.env);
    await next();
  });
  // --- Member (Employee) Routes ---
  app.get('/api/member/summary', async (c) => {
    const member = new MemberEntity(c.env, MOCK_MEMBER_SUMMARY.id);
    if (!await member.exists()) return notFound(c, 'member not found');
    const data = await member.getState();
    return ok(c, data.summary);
  });
  app.get('/api/member/contributions/recent', async (c) => {
    const member = new MemberEntity(c.env, MOCK_MEMBER_SUMMARY.id);
    if (!await member.exists()) return notFound(c, 'member not found');
    const data = await member.getState();
    return ok(c, data.contributions.slice(0, 5));
  });
  app.get('/api/member/contributions/all', async (c) => {
    const member = new MemberEntity(c.env, MOCK_MEMBER_SUMMARY.id);
    if (!await member.exists()) return notFound(c, 'member not found');
    const data = await member.getState();
    return ok(c, data.contributions);
  });
  app.get('/api/member/portfolio', async (c) => {
    const member = new MemberEntity(c.env, MOCK_MEMBER_SUMMARY.id);
    if (!await member.exists()) return notFound(c, 'member not found');
    const data = await member.getState();
    const fundsPage = await InvestmentFundEntity.list(c.env);
    const funds = fundsPage.items;
    const portfolioWithDetails = {
      allocation: data.portfolio,
      funds: funds,
    };
    return ok(c, portfolioWithDetails);
  });

  app.post('/api/member/portfolio', async (c) => {
    const member = new MemberEntity(c.env, MOCK_MEMBER_SUMMARY.id);
    if (!await member.exists()) return notFound(c, 'member not found');
    const newAllocation = await c.req.json();
    await member.updatePortfolio(newAllocation);
    return ok(c, { success: true });
  });

  app.get('/api/funds', async (c) => {
    const fundsPage = await InvestmentFundEntity.list(c.env);
    return ok(c, fundsPage.items);
  });
  // --- Employer Routes ---
  app.get('/api/employer/summary', async (c) => {
    const employer = new EmployerEntity(c.env, MOCK_EMPLOYER_SUMMARY.id);
    if (!await employer.exists()) return notFound(c, 'employer not found');
    const data = await employer.getState();
    return ok(c, data.summary);
  });
  app.get('/api/employer/employees', async (c) => {
    const employer = new EmployerEntity(c.env, MOCK_EMPLOYER_SUMMARY.id);
    if (!await employer.exists()) return notFound(c, 'employer not found');
    const data = await employer.getState();
    return ok(c, data.employees);
  });
  app.get('/api/employer/periods', async (c) => {
    const employer = new EmployerEntity(c.env, MOCK_EMPLOYER_SUMMARY.id);
    if (!await employer.exists()) return notFound(c, 'employer not found');
    const data = await employer.getState();
    return ok(c, data.periods);
  });
}