import { ReactChildren } from "@/lib/types";

const Layout = ({ children }: ReactChildren) => {
  return (
    <div className="mt-[20px]">
      {children}
    </div>
  );
};

export default Layout;
