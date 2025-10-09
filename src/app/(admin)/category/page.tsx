import React from "react";
import CategoryTable from "./components/CategoryTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category Management | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Category() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 space-y-0">
        <CategoryTable />
      </div>
    </div>
  );
}
