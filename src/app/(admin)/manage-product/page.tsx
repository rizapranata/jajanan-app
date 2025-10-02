import React from "react";
import ProductTable from "./components/ProductTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Management | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function ManageProducts() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 space-y-0">
        <ProductTable />
      </div>
    </div>
  );
}
