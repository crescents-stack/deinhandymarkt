import { cn } from "@/lib/utils";

const Printer = ({ className }: { className: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <g clipPath="url(#clip0_224_2447)">
        <path
          d="M4 6.00016V1.3335H12V6.00016"
          stroke="#6B7280"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.00016 12H2.66683C2.31321 12 1.97407 11.8595 1.72402 11.6095C1.47397 11.3594 1.3335 11.0203 1.3335 10.6667V7.33333C1.3335 6.97971 1.47397 6.64057 1.72402 6.39052C1.97407 6.14048 2.31321 6 2.66683 6H13.3335C13.6871 6 14.0263 6.14048 14.2763 6.39052C14.5264 6.64057 14.6668 6.97971 14.6668 7.33333V10.6667C14.6668 11.0203 14.5264 11.3594 14.2763 11.6095C14.0263 11.8595 13.6871 12 13.3335 12H12.0002"
          stroke="#6B7280"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.3335H4V14.6668H12V9.3335Z"
          stroke="#990000"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_224_2447">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Printer;
