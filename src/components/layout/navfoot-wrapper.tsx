"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import TopBanner from "../molecules/top-banner";
import { ReactChildren } from "@/lib/types";
import Spinner from "../atoms/spinner";
import { Toaster } from "../ui/toaster";

const NavFootWrapper = ({ children }: ReactChildren) => {
  const pathname = usePathname();
  return (
    <>
      <Toaster />
      <Spinner />
      {pathname.includes("/auth") ||
      pathname.includes("/dashboard") ||
      pathname.includes("/invoice") ? null : (
        <>
          <TopBanner />
          <Navbar />
        </>
      )}
      {children}
      {pathname.includes("/auth") ||
      pathname.includes("/dashboard") ||
      pathname.includes("/invoice") ? null : (
        <Footer />
      )}
    </>
  );
};

export default NavFootWrapper;
