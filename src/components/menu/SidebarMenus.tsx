// sidebarMenus.ts
export type Role = "guest" | "user" | "admin";
import { CalenderIcon, GridIcon, PlugInIcon, UserCircleIcon } from "@/icons";
import {
  ClipboardListIcon,
  HomeIcon,
  LogInIcon,
  PackageIcon,
  ShoppingCartIcon,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const SidebarMenus: Record<Role, NavItem[]> = {
  admin: [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <CalenderIcon />,
      name: "Manage Products",
      path: "/admin/products",
    },
    {
      icon: <UserCircleIcon />,
      name: "Users",
      path: "/admin/users",
    },
  ],
  user: [
    {
      icon: <PackageIcon />,
      name: "Products",
      path: "/customer/products",
    },
    {
      icon: <ShoppingCartIcon />,
      name: "My Cart",
      path: "/customer/cart",
    },
    {
      icon: <ClipboardListIcon />,
      name: "Orders",
      path: "/customer/orders",
    },
  ],
  guest: [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    {
      icon: <PlugInIcon />,
      name: "Authentication",
      subItems: [
        { name: "Sign In", path: "/signin", pro: false },
        { name: "Sign Up", path: "/signup", pro: false },
      ],
    },
    { name: "Login", path: "/login", icon: <LogInIcon /> },
  ],
};
