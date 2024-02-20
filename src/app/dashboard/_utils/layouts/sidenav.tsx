"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import clsx from "clsx";
import {
  Cog,
  Home,
  Layers,
  Library,
  LogOut,
  Menu,
  Package,
  Percent,
  Tags,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideNav = () => {
  const pathname = usePathname();
  const { auth, setAuth } = useAuthContext();
  const [showNav, setShowNav] = useState(false);

  const [navlinks, setNavlinks] = useState(navlinksUser);

  useEffect(() => {
    if (auth?.role === "admin") {
      setNavlinks(navlinksAdmin);
    }
  }, [auth?.role]);
  return (
    <>
      <div className="absolute top-0 left-0 z-10 pl-[20px] pt-[8px] flex min-[800px]:hidden">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setShowNav(true)}
          className="bg-white"
        >
          <Menu className="stroke-gray-500 stroke-[1.3px]" />
        </Button>
      </div>
      <div
        className={clsx(
          "absolute top-0 left-0 z-20 min-[800px]:relative bg-gray-200 h-full p-[20px] min-w-[260px] flex flex-col justify-between gap-10 transition ease-in-out duration-500",
          {
            "translate-x-0": showNav,
            "translate-x-[-100vw] min-[800px]:translate-x-0": !showNav,
          }
        )}
      >
        <ul>
          <li key={100} className="flex min-[800px]:hidden justify-end pb-5">
            <X
              className="stroke-gray-500 stroke-[1.3px]"
              role="button"
              onClick={() => setShowNav(false)}
            />
          </li>
          {navlinks.map((item) => {
            const { id, text, link, icon } = item;
            return (
              <li
                key={id}
                className="[&>*]:transition [&>*]:ease-in-out [&>*]:duration-500"
                onClick={() => setShowNav(false)}
              >
                <Link
                  href={link}
                  className={clsx(
                    "flex items-center gap-[8px] [&>svg]:w-[16px] [&>svg]:h-[16px] [&>svg]:stroke-[1.3px] px-[12px] py-[8px] rounded-[10px] group [&>svg]:hover:stroke-secondary",
                    {
                      "bg-white": pathname === link,
                      "bg-none": pathname !== link,
                    }
                  )}
                >
                  {icon}
                  <span
                    className={clsx("group-hover:text-secondary", {
                      "text-primary": pathname === link,
                      "text-dark": pathname !== link,
                    })}
                  >
                    {text}
                  </span>
                  {/* <BadgeDev /> */}
                </Link>
              </li>
            );
          })}
        </ul>
        <Button
          variant="secondary"
          className="gap-[8px]"
          onClick={() => {
            localStorage.clear();
            setAuth(null);
          }}
        >
          <LogOut className="w-[16px] h-[16px] stroke-white" />
          Logout
        </Button>
      </div>
    </>
  );
};

export default SideNav;

const navlinksAdmin = [
  {
    id: 1,
    text: "Home",
    icon: <Home />,
    link: "/dashboard",
  },
  {
    id: 2,
    text: "Orders",
    icon: <Package />,
    link: "/dashboard/orders",
  },
  {
    id: 3,
    text: "Products",
    icon: <Tags />,
    link: "/dashboard/products",
  },
  {
    id: 4,
    text: "Categories",
    icon: <Layers />,
    link: "/dashboard/categories",
  },
  {
    id: 5,
    text: "Customers",
    icon: <Users />,
    link: "/dashboard/customers",
  },
  {
    id: 6,
    text: "VAT",
    icon: <Percent />,
    link: "/dashboard/vat",
  },
  {
    id: 7,
    text: "Settings",
    icon: <Cog />,
    link: "/dashboard/settings",
  },
];
const navlinksUser = [
  {
    id: 1,
    text: "Home",
    icon: <Home />,
    link: "/dashboard",
  },
  {
    id: 2,
    text: "Orders",
    icon: <Package />,
    link: "/dashboard/orders",
  },
  {
    id: 7,
    text: "Settings",
    icon: <Cog />,
    link: "/dashboard/settings",
  },
];
