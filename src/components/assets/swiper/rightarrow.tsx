import { cn } from "@/lib/utils";

const RightArrow = ({className}:{className: string}) => {
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
        stroke="#00041F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.5 16L45 23.5L37.5 31"
        stroke="#00041F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightArrow;
