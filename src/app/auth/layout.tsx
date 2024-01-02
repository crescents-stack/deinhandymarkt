import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white min-h-[100vh] bg-[url('/images/auth/grid.svg')] bg-cover bg-center">
      <Link href="/" className="group container flex items-center gap-[8px]">
        <ChevronLeft className="w-[16px] h-[16px] stroke-gray-500 stroke-[1.3px] group-hover:stroke-secondary translate-x-0 group-hover:translate-x-[-10px] transition ease-in-out duration-500" />
        <span className="text-gray-500 group-hover:text-secondary">
          Back to home
        </span>
      </Link>
      <>{children}</>
    </section>
  );
};

export default Layout;
