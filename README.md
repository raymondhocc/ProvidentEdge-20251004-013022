# ProvidentEdge: MPF Administration System

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/ProvidentEdge-20251004-013022)

ProvidentEdge is a visually stunning, minimalist, and modern web application for managing Hong Kong's Mandatory Provident Fund (MPF). It provides a seamless and intuitive interface for both employees and employers. Employees can track their portfolio's total value, monitor investment performance with elegant charts, view detailed contribution history, and manage their investment fund allocations. Employers can efficiently administer employee contributions, track payment history, and manage their roster. The application prioritizes clarity, data visualization, and a frictionless user experience, transforming a typically complex administrative task into a simple and delightful one.

## Key Features

-   **Employee Dashboard:** At-a-glance summary of total balance, YTD performance, and investment allocation.
-   **Interactive Charts:** Elegant data visualizations for portfolio performance and fund allocation using Recharts.
-   **Contribution History:** Detailed, searchable, and paginated view of all past contributions.
-   **Investment Management:** View and manage investment fund allocations.
-   **Employer Portal:** A dedicated dashboard for employers to manage employee contributions and deadlines.
-   **Modern UI/UX:** Built with shadcn/ui, Tailwind CSS, and Framer Motion for a polished, responsive, and delightful user experience.
-   **End-to-End Type Safety:** Shared TypeScript types between the React frontend and Hono backend.

## Technology Stack

-   **Frontend:** React, Vite, TypeScript, React Router
-   **Backend:** Hono on Cloudflare Workers
-   **State Management:** Zustand
-   **UI:** Tailwind CSS, shadcn/ui, Framer Motion
-   **Data Visualization:** Recharts
-   **Data Persistence:** Cloudflare Durable Objects
-   **Schema Validation:** Zod

## Project Structure

This project is structured as a monorepo-style application within a single repository.

-   `src/`: Contains the React frontend application.
-   `worker/`: Contains the Hono backend application for Cloudflare Workers.
-   `shared/`: Contains shared TypeScript types and mock data for end-to-end type safety.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) as the package manager and runtime
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd provident_edge
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

### Running Locally

To start the development server, which includes the Vite frontend and the Wrangler server for the backend worker, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## Development

-   **Frontend Development:** All frontend code is located in the `src` directory. Changes will trigger hot-reloading in the browser.
-   **Backend Development:** The API is built with Hono and resides in the `worker` directory. API routes are defined in `worker/user-routes.ts`.
-   **Durable Objects:** The application uses a single `GlobalDurableObject` for all data persistence, abstracted through Entity classes defined in `worker/entities.ts`. This pattern ensures data consistency.

## Deployment

This application is designed to be deployed to Cloudflare's global network.

1.  **Build the application:**
    This command bundles both the frontend and the worker for production.
    ```bash
    bun build
    ```

2.  **Deploy to Cloudflare:**
    Run the deploy command using Wrangler.
    ```bash
    bun deploy
    ```

This will publish your application and make it available at the URL provided in the command output.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/ProvidentEdge-20251004-013022)