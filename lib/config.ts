export const MOCK_USERS = [
  {
    email: "franchise@chargeghar.com",
    password: "password123",
    role: "franchise",
    name: "Franchise Admin",
    redirect: "/franchise/dashboard",
  },
  {
    email: "vendor@chargeghar.com",
    password: "password123",
    role: "vendor",
    name: "Vendor User",
    redirect: "/vendor/dashboard",
  },
];

export type UserRole = "franchise" | "vendor" | "admin";

export const APP_CONFIG = {
  name: "ChargeGhar Collabator",
  supportEmail: "support@chargeghar.com",
};
