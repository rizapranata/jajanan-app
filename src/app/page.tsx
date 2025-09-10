import React from "react";
import HomeLayout from "./homeLayout";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "List Products | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <HomeLayout>
        <div className="grid grid-cols-12">
          <div className="col-span-12 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Products Page Home
            </h2>
            <RecentOrders />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
}
