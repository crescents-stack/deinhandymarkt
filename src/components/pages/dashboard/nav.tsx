import BrandLogoWhite from "@/components/assets/brand-logo-white";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import AccountLink from "./account-link";

const DashboardNav = () => {
  return (
    <nav className="flex items-center justify-between gap-5 p-[20px] bg-primary">
      <Link href="/">
        <BrandLogoWhite className="max-h-[24px] w-auto" />
      </Link>
      <AccountLink white={true} />
    </nav>
  );
};

export default DashboardNav;
