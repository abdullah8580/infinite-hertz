import React from "react";
import { Navbar, Links } from "@/components/Header";

export const dynamic = "force-dynamic";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <Links href="/admin">Dashboard</Links>
        <Links href="/admin/products">Products</Links>
        <Links href="/admin/users">Customers</Links>
        <Links href="/admin/orders">Sales</Links>
      </Navbar>
      <div className="container my-5">{children}</div>
    </>
  );
}

export default AdminLayout;
