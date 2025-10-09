// sidebarMenus.ts
export type Role = "guest" | "user" | "admin";
import { GridIcon, UserCircleIcon } from "@/icons";
import {
  ClipboardListIcon,
  PackageIcon,
  Hamburger,
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
      path: "/",
    },
    {
      icon: <Hamburger />,
      name: "Manage Products",
      subItems: [
        {
          name: "Product",
          path: "/manage-product",
        },
        {
          name: "Category",
          path: "/category",
        },
        {
          name: "Tag",
          path: "/tag",
        },
      ],
    },
    {
      icon: <UserCircleIcon />,
      name: "Manage Users",
      path: "/users",
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
