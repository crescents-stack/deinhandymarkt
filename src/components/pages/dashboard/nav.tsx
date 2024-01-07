import BrandLogoWhite from "@/components/assets/brand-logo-white";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const DashboardNav = () => {
  return (
    <nav className="flex items-center justify-between gap-5 p-[20px] bg-primary">
      <Link href="/">
        <BrandLogoWhite className="max-h-[24px] w-auto" />
      </Link>
      <Link
        href="/dashboard/settings"
        className="flex flex-end items-center gap-[8px]"
      >
        <span className="text-white">John Doe</span>
        <UserCircle className="stroke-[1.3px] stroke-white" />
      </Link>
    </nav>
  );
};

export default DashboardNav;
