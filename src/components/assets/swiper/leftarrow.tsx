import { cn } from "@/lib/utils";

const LeftArrow = ({ className }: { className: string }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <path
        d="M5 23.5H45"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 16L5 23.5L12.5 31"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftArrow;
