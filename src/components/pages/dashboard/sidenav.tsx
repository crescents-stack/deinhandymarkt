"use client";

import clsx from "clsx";
import { Cog, Home, Layers, Library, Package, Tags, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="bg-muted min-h-[90vh] p-[20px] min-w-[260px]">
      <ul>
        {navlinks.map((item) => {
          const { id, text, link, icon } = item;
          return (
            <li
              key={id}
              className="[&>*]:transition [&>*]:ease-in-out [&>*]:duration-500"
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
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;

const navlinks = [
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
    text: "Blog",
    icon: <Library />,
    link: "/dashboard/blog",
  },
  {
    id: 7,
    text: "Settings",
    icon: <Cog />,
    link: "/dashboard/settings",
  },
];
