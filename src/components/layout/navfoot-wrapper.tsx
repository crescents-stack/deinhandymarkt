"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import TopBanner from "../molecules/topbnanner";

const NavFootWrapper = ({ children }: ReactChildren) => {
  const pathname = usePathname();
  return (
    <div>
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
