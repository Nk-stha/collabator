# Collabator — ChargeGhar Partner Dashboard

> Next.js 16 dashboard for Franchise and Vendor partners to manage powerbank stations, payouts, ejections, and agreements.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19 + Tailwind CSS 4
- **Icons:** Lucide React + Material Symbols
- **Toast:** Sonner
- **Theme:** next-themes

---

## Current Folder Structure

```
collabator/
├── app/                                # Next.js App Router
│   ├── layout.tsx                      # Root layout (fonts, providers, metadata)
│   ├── page.tsx                        # Landing / root page
│   ├── globals.css                     # Global styles & Tailwind config
│   ├── login/
│   │   └── page.tsx                    # Login page (mock auth)
│   ├── design-system/
│   │   └── page.tsx                    # Design system showcase
│   └── (dashboard)/                    # Dashboard route group
│       ├── layout.tsx                  # Dashboard shell (sidebar + navbar)
│       ├── franchise/                  # Franchise role pages
│       │   ├── dashboard/page.tsx      # Franchise analytics dashboard
│       │   ├── stations/page.tsx       # Station list (table)
│       │   ├── stations/[stationId]/page.tsx  # Station detail + slot management
│       │   ├── ejection-logs/page.tsx  # Ejection log history
│       │   ├── payouts/page.tsx        # Payout stats + transactions
│       │   ├── sub-vendors/page.tsx    # Sub-vendor list
│       │   ├── sub-vendors/[vendorId]/page.tsx  # Sub-vendor detail
│       │   └── agreements/page.tsx     # Master + vendor agreements
│       └── vendor/                     # Vendor role pages
│           ├── dashboard/page.tsx      # Vendor dashboard
│           ├── stations/page.tsx       # Assigned stations (read-only)
│           ├── stations/[stationId]/page.tsx  # Station detail (limited actions)
│           ├── ejection-logs/page.tsx  # Ejection log history
│           ├── payouts/page.tsx        # Payout stats + transactions
│           └── agreements/page.tsx     # Vendor agreement view
│
├── components/
│   ├── ui/                             # Reusable base components
│   │   ├── button.tsx                  # Button variants (primary, secondary, ghost)
│   │   ├── card.tsx                    # Card wrapper
│   │   ├── input.tsx                   # Input with label, icon, error support
│   │   └── spinner.tsx                 # Loading spinner
│   ├── dashboard/                      # Dashboard-specific components
│   │   ├── sidebar.tsx                 # Sidebar + MobileSidebar
│   │   ├── navbar.tsx                  # Top navigation bar
│   │   ├── data-table.tsx              # Generic sortable data table
│   │   ├── glass-table.tsx             # Glass-style table variant
│   │   ├── stats-card.tsx              # Stat display card
│   │   ├── station-view.tsx            # Station detail page component
│   │   ├── station-live-view.tsx       # Live slot status view
│   │   ├── ejection-view.tsx           # Ejection logs page component
│   │   ├── ejection-stats.tsx          # Ejection statistics cards
│   │   ├── payout-view.tsx             # Payout page component
│   │   ├── payout-stats.tsx            # Payout statistics cards
│   │   ├── transaction-table.tsx       # Transaction history table
│   │   ├── vendor-stats.tsx            # Vendor dashboard stat cards
│   │   ├── vendor-payout-card.tsx      # Vendor payout summary card
│   │   ├── support-cta.tsx             # Support call-to-action card
│   │   └── wifi-connect-modal.tsx      # WiFi configuration modal
│   ├── forms/
│   │   └── login-form.tsx              # Reusable login form component
│   ├── layout/
│   │   └── navigation.tsx              # Navigation component
│   ├── providers/
│   │   └── theme-provider.tsx          # Theme context (dark/light)
│   └── theme/
│       └── theme-toggle.tsx            # Theme toggle button
│
├── hooks/
│   └── use-theme.ts                    # Theme hook
│
├── lib/
│   ├── config.ts                       # App config + mock user credentials
│   ├── mockData.ts                     # Mock data (stations, transactions, rentals, users)
│   └── utils.ts                        # Utility functions (cn helper)
│
├── docs/
│   ├── api-implementation-plan.md      # API integration plan
│   ├── design.md                       # Design guidelines
│   ├── system.md                       # System documentation
│   └── ui.md                           # UI component documentation
│
├── public/                             # Static assets
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── next.config.ts                      # Next.js configuration
└── package.json                        # Dependencies & scripts
```

---

## Suggested API Integration Folder Structure

The following structure introduces an API layer optimized for **maintainability**, **scalability**, and **reusability** without over-engineering.

```
collabator/
├── .env.local                          # Environment variables (git-ignored)
├── .env.example                        # Env template for team onboarding
├── middleware.ts                       # Auth route protection (Next.js middleware)
│
├── lib/
│   ├── api-client.ts                   # ← Central fetch wrapper
│   │                                   #    - Auto base URL from env
│   │                                   #    - Auth token injection (Bearer)
│   │                                   #    - JSON parsing + error classification
│   │                                   #    - Next.js cache/revalidate support
│   │                                   #    - Generic typed responses
│   │
│   ├── api-error.ts                    # ← Custom ApiError class
│   │                                   #    - status, message, fieldErrors
│   │                                   #    - Helpers: isNetworkError, isAuthError,
│   │                                   #      isServerError, isValidationError, isNotFound
│   │                                   #    - Factory: ApiError.networkError()
│   │
│   ├── env.ts                          # ← Type-safe env variable access
│   │
│   ├── types/                          # ← Shared TypeScript contracts
│   │   ├── index.ts                    #    Barrel export
│   │   ├── api.types.ts                #    PaginatedResponse<T>, PaginationParams
│   │   ├── auth.types.ts               #    LoginRequest, LoginResponse, AuthUser
│   │   ├── station.types.ts            #    Station, StationDetail, StationSlot, WifiNetwork
│   │   ├── transaction.types.ts        #    Transaction, PayoutTransaction, PayoutStats
│   │   ├── ejection.types.ts           #    EjectionLog, EjectionStats
│   │   └── vendor.types.ts             #    Vendor, Agreement, MasterAgreement
│   │
│   ├── services/                       # ← Domain-organized API modules
│   │   ├── index.ts                    #    Barrel export
│   │   ├── auth.service.ts             #    login(), logout(), getToken()
│   │   ├── station.service.ts          #    getStations(), getStationById(), ejectPowerbank(),
│   │   │                               #    rebootStation(), scanWifi(), connectWifi()
│   │   ├── payout.service.ts           #    getStats(), getTransactions()
│   │   ├── ejection.service.ts         #    getStats(), getLogs()
│   │   ├── vendor.service.ts           #    getSubVendors(), getVendorById()
│   │   └── agreement.service.ts        #    getMasterAgreement(), getVendorAgreements()
│   │
│   ├── config.ts                       #    Existing app config
│   ├── mockData.ts                     #    Existing mock data (remove after full migration)
│   └── utils.ts                        #    Existing utilities
│
├── hooks/
│   ├── use-theme.ts                    #    Existing theme hook
│   └── use-api.ts                      # ← Generic data fetching hook
│                                       #    Returns: { data, isLoading, error, refetch }
│                                       #    - Race condition handling
│                                       #    - Unmount safety
│                                       #    - Auto 401 redirect
│
├── components/ui/
│   ├── button.tsx                      #    Existing
│   ├── card.tsx                        #    Existing
│   ├── input.tsx                       #    Existing
│   ├── spinner.tsx                     #    Existing
│   ├── error-display.tsx               # ← Contextual error UI
│   │                                   #    - Network error → retry button
│   │                                   #    - Auth error → access denied
│   │                                   #    - Server error → generic + retry
│   │                                   #    - Supports compact (inline) and full-page modes
│   ├── page-loader.tsx                 # ← Skeleton loading state
│   └── empty-state.tsx                 # ← "No data" placeholder with optional action
│
└── app/                                #    Pages consume services via useApi hook
```

### Why This Structure Works

| Principle | How It's Achieved |
|---|---|
| **Single Responsibility** | Each service handles one domain. `api-client.ts` handles HTTP only. `ApiError` handles error classification only. |
| **DRY / Reusability** | Services are shared across franchise & vendor pages. Types are shared via barrel exports. `useApi` hook eliminates repeated loading/error boilerplate. |
| **Scalability** | Adding a new domain = 1 type file + 1 service file. No changes to existing code. |
| **Maintainability** | API endpoint changes are isolated to a single service file. Error handling is centralized, not scattered across pages. |
| **Type Safety** | Every request/response is typed end-to-end. No `any` types. |
| **Framework Alignment** | Uses native `fetch` (leverages Next.js caching). Cookie-based auth works with Next.js middleware. |

### Adding a New API Domain (Example: Notifications)

```
1. Create types       →  lib/types/notification.types.ts
2. Export from barrel  →  lib/types/index.ts (add export)
3. Create service      →  lib/services/notification.service.ts
4. Export from barrel  →  lib/services/index.ts (add export)
5. Use in page         →  useApi(() => notificationService.getAll())
```

No other files need to change. Existing code is untouched.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment config
cp .env.example .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

| Role | Email | Password |
|---|---|---|
| Franchise | franchise@chargeghar.com | password123 |
| Vendor | vendor@chargeghar.com | password123 |

---

## Documentation

- [API Implementation Plan](docs/api-implementation-plan.md) — Full implementation guide with code
- [Design Guidelines](docs/design.md) — Color palette and design tokens
- [System Documentation](docs/system.md) — System architecture overview
- [UI Components](docs/ui.md) — Component library reference
