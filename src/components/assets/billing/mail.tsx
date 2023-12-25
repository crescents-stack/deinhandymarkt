import { cn } from "@/lib/utils";

const Mail = ({ className }: { className: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <path
        d="M14.6668 4.6665L8.68683 8.4665C8.48101 8.59545 8.24304 8.66384 8.00016 8.66384C7.75728 8.66384 7.51931 8.59545 7.3135 8.4665L1.3335 4.6665"
        stroke="#990000"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3335 2.6665H2.66683C1.93045 2.6665 1.3335 3.26346 1.3335 3.99984V11.9998C1.3335 12.7362 1.93045 13.3332 2.66683 13.3332H13.3335C14.0699 13.3332 14.6668 12.7362 14.6668 11.9998V3.99984C14.6668 3.26346 14.0699 2.6665 13.3335 2.6665Z"
        stroke="#6B7280"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Mail;
