import React from "react";
import type { Metadata } from "next";
import TagTable from "./components/TagTable";

export const metadata: Metadata = {
  title: "Tags Management | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Category() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 space-y-0">
        <TagTable />
      </div>
    </div>
  );
}
