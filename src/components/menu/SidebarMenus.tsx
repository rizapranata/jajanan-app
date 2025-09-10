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
      path: "/admin",
    },
    {
      icon: <CalenderIcon />,
      name: "Manage Products",
      path: "/admin/product",
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
      path: "/products",
    },
    {
      icon: <ShoppingCartIcon />,
      name: "My Cart",
      path: "/cart",
    },
    {
      icon: <ClipboardListIcon />,
      name: "Orders",
      path: "/orders",
    },
  ],
  guest: [{ name: "Products", path: "/products", icon: <PackageIcon /> }],
};
