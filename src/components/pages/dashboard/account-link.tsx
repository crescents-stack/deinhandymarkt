import clsx from "clsx";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const AccountLink = ({ white }: { white: boolean }) => {
  return (
    <Link
      href="/dashboard/settings"
      className="flex flex-end items-center gap-[8px] group"
    >
      <span
        className={clsx("group-hover:text-secondary", {
          "text-white": white,
          "text-dark": !white,
        })}
      >
        John Doe
      </span>
      <UserCircle
        className={clsx("stroke-[1.3px] group-hover:stroke-secondary", {
          "stroke-white": white,
          "stroke-dark": !white,
        })}
      />
    </Link>
  );
};

export default AccountLink;
