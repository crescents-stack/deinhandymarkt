import { cn } from "@/lib/utils";

const CirclesTriangle = ({ className }: { className: string }) => {
  return (
    <svg
      // width="202"
      // height="203"
      viewBox="0 0 202 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <rect width="60" height="60" rx="30" fill="#990000" />
      <rect x="71" width="60" height="60" rx="30" fill="#990000" />
      <rect x="142" width="60" height="60" rx="30" fill="#990000" />
      <rect x="142" y="71" width="60" height="60" rx="30" fill="#990000" />
      <rect x="71" y="71" width="60" height="60" rx="30" fill="#990000" />
      <rect x="142" y="143" width="60" height="60" rx="30" fill="#990000" />
    </svg>
  );
};

export default CirclesTriangle;
