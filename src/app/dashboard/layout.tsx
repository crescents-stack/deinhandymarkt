import PrivateRoute from "@/components/layout/private-route";
import DashboardNav from "@/components/pages/dashboard/nav";
import SideNav from "@/components/pages/dashboard/sidenav";
import { ReactChildren } from "@/lib/types";

const Layout = ({ children }: ReactChildren) => {
  return (
    <PrivateRoute>
      <div className="bg-white">
        <DashboardNav />
        <div className="flex items-start gap-[24px]">
          <SideNav />
          <div className="w-full min-h-[90vh] py-[32px]">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
