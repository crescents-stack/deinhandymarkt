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
        className={clsx({
          "text-white group-hover:text-muted": white,
          "text-dark group-hover:text-secondary": !white,
        })}
      >
        John Doe
      </span>
      <UserCircle
        className={clsx("stroke-[1.3px]", {
          "stroke-white group-hover:stroke-muted": white,
          "stroke-dark group-hover:stroke-secondary": !white,
        })}
      />
    </Link>
  );
};

export default AccountLink;
