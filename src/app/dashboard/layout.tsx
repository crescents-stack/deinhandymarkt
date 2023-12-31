import PrivateRoute from "@/components/layout/private-route";
import DashboardNav from "@/components/pages/dashboard/nav";
import SideNav from "@/components/pages/dashboard/sidenav";
import { ReactChildren } from "@/lib/types";

const Layout = ({ children }: ReactChildren) => {
  return (
    <PrivateRoute>
      <div className="bg-white">
        <DashboardNav />
        <div
          className="flex relative"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <SideNav />
          <div className="w-full py-[48px] px-[24px] pt-[48px] min-[800px]:py-[32px] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
