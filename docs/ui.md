# Collabator (Charge Ghar) - UI Documentation

> Comprehensive UI structure and design system documentation for the Charge Ghar admin portal.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Design System](#design-system)
   - [Color Palette](#color-palette)
   - [Typography](#typography)
   - [Spacing & Layout](#spacing--layout)
5. [Components](#components)
   - [UI Components](#ui-components)
   - [Layout Components](#layout-components)
   - [Form Components](#form-components)
   - [Theme Components](#theme-components)
6. [Pages & Routes](#pages--routes)
7. [Theming System](#theming-system)
8. [Data Models](#data-models)
9. [Usage Examples](#usage-examples)

---

## Project Overview

**Collabator (Charge Ghar)** is a Next.js-based admin portal for managing a powerbank rental service. The UI emphasizes high contrast actions, clean typography, and a robust dark/light theming system.

**Key Features:**
- Dark/Light theme support with smooth transitions
- Reusable component library
- Responsive design (mobile-first approach)
- Modern glassmorphism effects
- Consistent brand identity

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4.1.18 | Utility-first CSS |
| lucide-react | ^0.562.0 | Icon library |
| next-themes | ^0.4.6 | Theme management |
| clsx | ^2.1.1 | Conditional classnames |
| tailwind-merge | ^3.4.0 | Merge Tailwind classes |

---

## Directory Structure

```
collabator/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (component showcase)
│   ├── design-system/            # Design system demo page
│   │   └── page.tsx
│   └── login/                    # Login page
│       └── page.tsx
├── components/
│   ├── forms/                    # Form components
│   │   └── login-form.tsx        # Reusable login form
│   ├── layout/                   # Layout components
│   │   └── navigation.tsx        # Navigation bar
│   ├── providers/                # Context providers
│   │   └── theme-provider.tsx    # Theme context provider
│   ├── theme/                    # Theme-related components
│   │   └── theme-toggle.tsx      # Dark/light toggle button
│   └── ui/                       # Core UI components
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card component
│       ├── input.tsx             # Input component
│       └── spinner.tsx           # Loading spinner
├── hooks/                        # Custom React hooks
│   └── use-theme.ts              # Theme hook
├── lib/                          # Utilities
│   ├── utils.ts                  # Helper functions (cn)
│   └── mockData.ts               # Mock data for development
└── public/                       # Static assets
```

---

## Design System

### Color Palette

#### Brand Colors

| Token | Light Mode | Dark Mode | Hex Value | Usage |
|-------|------------|-----------|-----------|-------|
| `primary` | - | - | `#54BC28` | Main brand color, CTAs |
| `primary-hover` | - | - | `#46A020` | Hover states |
| `primary-active` | - | - | `#39821A` | Active/pressed states |

#### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `background` | `#F3F4F6` | `#0A0A0A` | Page background |
| `surface` | `#FFFFFF` | `#121212` | Card/panel backgrounds |
| `input` | `#FFFFFF` | `#1F1F1F` | Input field backgrounds |
| `border` | `#E5E7EB` | `#27272A` | Border colors |
| `text-primary` | `#111827` | `#FFFFFF` | Main text |
| `text-secondary` | `#9CA3AF` | `#9CA3AF` | Secondary text |
| `text-muted` | `#6B7280` | `#9CA3AF` | Muted/helper text |

#### CSS Variables (globals.css)

```css
:root {
    --background: #F3F4F6;
    --surface: #FFFFFF;
    --input: #FFFFFF;
    --border: #E5E7EB;
    --text-primary: #111827;
    --text-muted: #6B7280;
}

.dark {
    --background: #0A0A0A;
    --surface: #121212;
    --input: #1F1F1F;
    --border: #27272A;
    --text-primary: #FFFFFF;
    --text-muted: #9CA3AF;
}
```

### Typography

| Property | Value |
|----------|-------|
| Font Family | `Inter`, `Geist`, `Geist Mono` |
| Base Size | `14px` (sm:text-sm) |
| Line Height | Default Tailwind values |

**Font Weights Used:**
- `font-medium` (500) - Labels, subtle emphasis
- `font-semibold` (600) - Buttons, headings
- `font-bold` (700) - Page titles, brand name

### Spacing & Layout

| Element | Spacing |
|---------|---------|
| Card padding (sm) | `p-4` (16px) |
| Card padding (md) | `p-6` (24px) |
| Card padding (lg) | `p-8` (32px) |
| Section gap | `gap-8` (32px) |
| Form field gap | `space-y-4` / `space-y-6` |
| Container max-width | `max-w-7xl` |

---

## Components

### UI Components

#### Button (`components/ui/button.tsx`)

A versatile button component with multiple variants and states.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Shows spinner |
| `leftIcon` | `ReactNode` | - | Icon before text |
| `rightIcon` | `ReactNode` | - | Icon after text |
| `fullWidth` | `boolean` | `false` | Full width button |
| `disabled` | `boolean` | `false` | Disabled state |

**Variants:**

```tsx
// Primary - Green background with shadow
<Button variant="primary">Submit</Button>

// Secondary - Outlined with primary border
<Button variant="secondary">Cancel</Button>

// Ghost - Transparent with hover effect
<Button variant="ghost">Menu</Button>
```

**Sizes:**

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | `h-9` | `px-4` | `text-sm` |
| `md` | `h-11` | `px-6` | `text-sm` |
| `lg` | `h-14` | `px-8` | `text-base` |

---

#### Card (`components/ui/card.tsx`)

Container component for grouping related content.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Optional title |
| `subtitle` | `string` | - | Optional subtitle |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `hoverable` | `boolean` | `false` | Hover lift effect |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | - | Additional classes |

**Example:**

```tsx
<Card title="Station Info" subtitle="Real-time data" hoverable>
  <p>Content goes here...</p>
</Card>
```

---

#### Input (`components/ui/input.tsx`)

Text input with label, icons, and validation support.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `error` | `string` | - | Error message |
| `leftIcon` | `ReactNode` | - | Icon on left |
| `rightIcon` | `ReactNode` | - | Icon on right |
| `helperText` | `string` | - | Helper text below |
| `type` | `string` | `'text'` | Input type |

**Features:**
- Auto password visibility toggle for `type="password"`
- Error state styling with red border/ring
- Disabled state with reduced opacity

**Example:**

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  leftIcon={<Mail className="h-4 w-4" />}
  error="Invalid email address"
/>
```

---

#### Spinner (`components/ui/spinner.tsx`)

Loading indicator using Lucide's `Loader2` icon.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `className` | `string` | - | Additional classes |

**Sizes:**

| Size | Dimensions |
|------|------------|
| `sm` | `h-4 w-4` |
| `md` | `h-6 w-6` |
| `lg` | `h-8 w-8` |

---

### Layout Components

#### Navigation (`components/layout/navigation.tsx`)

Top navigation bar with logo, title, and actions.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | - | Logo element |
| `title` | `string` | **required** | Page/app title |
| `rightActions` | `ReactNode[]` | - | Action buttons |
| `sticky` | `boolean` | `false` | Sticky positioning |
| `className` | `string` | - | Additional classes |

**Features:**
- Glassmorphism effect (`backdrop-blur-md`)
- Integrated `ThemeToggle`
- Border separator for actions

**Example:**

```tsx
<Navigation
  title="Charge Ghar Admin"
  logo={<Bolt className="h-6 w-6 text-primary" />}
  sticky
  rightActions={[
    <Button key="settings" variant="ghost">Settings</Button>
  ]}
/>
```

---

### Form Components

#### LoginForm (`components/forms/login-form.tsx`)

Complete login form with validation.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(credentials) => void` | **required** | Submit handler |
| `loading` | `boolean` | `false` | Loading state |
| `error` | `string` | - | Form-level error |
| `title` | `string` | `'Welcome Back'` | Form title |
| `subtitle` | `string` | `'Sign in to continue'` | Form subtitle |
| `forgotPasswordLink` | `string` | - | Forgot password URL |
| `signupLink` | `string` | - | Signup URL |

**Validation:**
- Email required + format validation
- Password required

**Example:**

```tsx
<LoginForm
  onSubmit={(creds) => authenticate(creds)}
  loading={isLoading}
  error={authError}
  forgotPasswordLink="/forgot-password"
  signupLink="/signup"
/>
```

---

### Theme Components

#### ThemeToggle (`components/theme/theme-toggle.tsx`)

Button to switch between light and dark themes.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional classes |

**Behavior:**
- Shows `Sun` icon in light mode
- Shows `Moon` icon in dark mode
- Uses `ghost` button variant

---

## Pages & Routes

### Home Page (`/`)

**File:** `app/page.tsx`

Component showcase page displaying:
- Navigation bar with brand
- Button palette (primary, secondary, disabled, hover states)
- Brand color swatches
- Interactive login form demo

**Layout:** Two-column responsive layout
- Left: Component demos
- Right: Login form with decorative background

---

### Login Page (`/login`)

**File:** `app/login/page.tsx`

Dedicated authentication page featuring:
- Split-screen layout (hero + form)
- Animated gradient background
- Mobile-responsive (hero hidden on mobile)
- Password visibility toggle
- Fixed-position theme toggle

---

### Design System Demo (`/design-system`)

**File:** `app/design-system/page.tsx`

Living documentation page showcasing:
- All button variants and states
- Input field variations
- Card examples
- LoginForm composition
- Spinner sizes

---

## Theming System

### Architecture

```
ThemeProvider (Context)
    └── useThemeContext (Hook - internal)
        └── useTheme (Hook - public API)
            └── ThemeToggle (Component)
```

### ThemeProvider (`components/providers/theme-provider.tsx`)

Context provider that:
- Manages `light` | `dark` theme state
- Persists to `localStorage` (key: `ui-theme`)
- Applies theme class to `<html>` element

**Usage (in layout.tsx):**

```tsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

### useTheme Hook (`hooks/use-theme.ts`)

Public API for theme management.

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `'light' \| 'dark'` | Current theme |
| `setTheme` | `(theme) => void` | Set specific theme |
| `toggleTheme` | `() => void` | Toggle between themes |

**Example:**

```tsx
const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  Current: {theme}
</button>
```

---

## Data Models

### User

```typescript
interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'VENDOR' | 'FRANCHISEE' | 'USER';
    status: 'ACTIVE' | 'INACTIVE';
    avatar?: string;
    permissions: string[];
}
```

### Station

```typescript
interface Station {
    id: string;
    station_name: string;
    serial_number: string;
    imei: string;
    latitude: string;
    longitude: string;
    address: string;
    status: 'ONLINE' | 'OFFLINE';
    total_slots: number;
    available_slots: number;
    occupied_slots: number;
    total_powerbanks: number;
    last_heartbeat: string;
}
```

### Transaction

```typescript
interface Transaction {
    id: string;
    transaction_id: string;
    type: 'EARNED' | 'CREDIT' | 'TOPUP' | 'DEBIT';
    amount?: number;
    points?: number;
    status: string;
    created_at: string;
    description: string;
    source: string;
    user: {
        id: string;
        username: string;
        email: string | null;
    };
}
```

### Rental

```typescript
interface Rental {
    id: string;
    rental_code: string;
    status: string;
    payment_status: string;
    user_id: number;
    username: string;
    station_id: string;
    station_name: string;
    powerbank_serial: string;
    amount_paid: string;
    created_at: string;
}
```

---

## Usage Examples

### Creating a New Page

```tsx
// app/dashboard/page.tsx
"use client";

import { Navigation } from "@/components/layout/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bolt, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navigation
        title="Dashboard"
        logo={<Bolt className="h-6 w-6 text-primary" />}
        sticky
      />
      
      <main className="container mx-auto px-4 py-8">
        <Card title="Stations Overview" hoverable>
          <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            Add Station
          </Button>
        </Card>
      </main>
    </div>
  );
}
```

### Using the cn() Utility

```tsx
import { cn } from "@/lib/utils";

// Combine conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-variant"
)} />
```

### Form with Validation

```tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function MyForm() {
  const [error, setError] = useState("");
  
  return (
    <form>
      <Input
        label="Station Name"
        placeholder="Enter station name"
        error={error}
        onChange={(e) => {
          if (e.target.value.length < 3) {
            setError("Name must be at least 3 characters");
          } else {
            setError("");
          }
        }}
      />
      <Button type="submit" variant="primary">
        Save
      </Button>
    </form>
  );
}
```

---

## Styling Conventions

### Tailwind Class Order

1. Layout (`flex`, `grid`, `block`)
2. Positioning (`relative`, `absolute`, `sticky`)
3. Box Model (`w-`, `h-`, `p-`, `m-`)
4. Typography (`text-`, `font-`)
5. Visual (`bg-`, `border-`, `shadow-`)
6. Interactive (`hover:`, `focus:`, `active:`)
7. Responsive (`sm:`, `md:`, `lg:`)
8. Dark mode (`dark:`)

### Common Patterns

```tsx
// Card-like container
"rounded-xl border border-gray-200 dark:border-gray-800 bg-surface p-6"

// Primary action button
"bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl"

// Input field
"rounded-xl border border-gray-300 dark:border-transparent bg-gray-50 dark:bg-input focus:ring-2 focus:ring-primary"

// Glassmorphism effect
"bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md"
```

---

## Future Considerations

- [ ] Add `Select` dropdown component
- [ ] Add `Modal` / `Dialog` component
- [ ] Add `Table` component for data display
- [ ] Add `Toast` notification system
- [ ] Add `Tabs` component
- [ ] Add `Badge` component for status indicators
- [ ] Add form library integration (react-hook-form)
- [ ] Add animation library (framer-motion)

---

*Last updated: January 8, 2026*
