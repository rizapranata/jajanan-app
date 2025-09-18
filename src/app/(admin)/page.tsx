import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import RecentOrders from "@/components/ecommerce/RecentOrders";

export const metadata: Metadata = {
  title: "Admin | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function AdminPage() {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 space-y-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Admin
        </h3>
        <EcommerceMetrics />
        <RecentOrders />
      </div>
    </div>
  );
}
