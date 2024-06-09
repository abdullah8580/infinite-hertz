"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <div>
      <Link
        href={"/"}
        className="bg-primary text-primary-foreground flex justify-center py-5 border-b-2 border-white"
      >
        <h1 className="text-4xl hover:text-gray-400">Infinite Hertz</h1>
      </Link>
      <nav className="bg-primary text-primary-foreground flex justify-center px-5">
        {children}
      </nav>
    </div>
  );
}

export function Links(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "m-5 hover:border-b-2 hover:border-background focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "border-b-2 border-background"
      )}
    />
  );
}
