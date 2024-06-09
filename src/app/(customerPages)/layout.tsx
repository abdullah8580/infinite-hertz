import React from "react";
import { Navbar, Links } from "@/components/Header";
import Link from "next/link";

export const dynamic = "force-dynamic";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <Links href="/">Home</Links>
        <Links href="/products">Products</Links>
        <Links href="/orders">My Orders</Links>
      </Navbar>
      <div className="container my-5">{children}</div>
    </>
  );
}

export default AdminLayout;
