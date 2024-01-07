import DashboardNav from "@/components/pages/dashboard/nav";
import SideNav from "@/components/pages/dashboard/sidenav";
import { ReactChildren } from "@/lib/types";

const Layout = ({ children }: ReactChildren) => {
  return (
    <div className="bg-white">
      <DashboardNav />
      <div className="flex items-start gap-[24px]">
        <SideNav />
        <div className="w-full min-h-[90vh] py-[32px]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
