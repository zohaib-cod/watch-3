"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  const isAdminPage =
    pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}