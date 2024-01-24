import DashboardNav from "@/app/dashboard/_utils/layouts/nav";
import SideNav from "@/app/dashboard/_utils/layouts/sidenav";
import PrivateRouter from "@/components/layout/private-route";
import { ReactChildren } from "@/lib/types";

const Layout = ({ children }: ReactChildren) => {
  return (
    <PrivateRouter>
      <div className="bg-white">
        <DashboardNav />
        <div className="flex relative overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
          <SideNav />
          <div className="w-full py-[48px] px-[24px] pt-[48px] min-[800px]:py-[32px] overflow-auto" style={{ height: "calc(100vh - 64px)" }}>
            {children}
          </div>
        </div>
      </div>
    </PrivateRouter>
  );
};

export default Layout;
