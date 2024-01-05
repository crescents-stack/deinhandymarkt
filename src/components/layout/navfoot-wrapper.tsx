"use client";

import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import TopBanner from "../molecules/top-banner";
import { ReactChildren } from "@/lib/types";
import Spinner from "../atoms/spinner";

const NavFootWrapper = ({ children }: ReactChildren) => {
  const pathname = usePathname();
  return (
    <div>
      <Toaster />
      <Spinner />
      {pathname.includes("/auth") ? null : (
        <>
          <TopBanner />
          <Navbar />
        </>
      )}
      {children}
      {pathname.includes("/auth") ? null : <Footer />}
    </div>
  );
};

export default NavFootWrapper;
