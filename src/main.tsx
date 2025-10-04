import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { AppLayout } from '@/components/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { ContributionsPage } from '@/pages/ContributionsPage';
import { InvestmentsPage } from '@/pages/InvestmentsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { EmployerDashboardPage } from '@/pages/EmployerDashboardPage';
import { Toaster } from "@/components/ui/sonner";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    element: (
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/contributions",
        element: <ContributionsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/investments",
        element: <InvestmentsPage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/employer/dashboard",
        element: <EmployerDashboardPage />,
        errorElement: <RouteErrorBoundary />,
      },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors closeButton />
  </StrictMode>,
)