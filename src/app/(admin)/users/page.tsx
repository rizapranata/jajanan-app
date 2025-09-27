
import type { Metadata } from "next";
import React from "react";
import UserTable from "./components/UserTable";

export const metadata: Metadata = {
  title: "Management User | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function User() {

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 space-y-6">
        <UserTable />
      </div>
    </div>
  );
}
