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
          className="flex gap-[24px] relative"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <SideNav />
          <div className="w-full py-[32px] px-[24px] min-[800px]:px-0 pt-[48px] min-[800px]:p-[32px]">
            {children}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
