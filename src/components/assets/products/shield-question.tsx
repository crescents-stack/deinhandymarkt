import { cn } from "@/lib/utils";

const ShieldQuestion = ({ className }: { className: string }) => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <path
        d="M17.4999 32.0833C17.4999 32.0833 29.1666 26.25 29.1666 17.5V7.29167L17.4999 2.91667L5.83325 7.29167V17.5C5.83325 26.25 17.4999 32.0833 17.4999 32.0833Z"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2708 13.125C13.6207 12.1605 14.2985 11.3497 15.1857 10.8343C16.0729 10.3189 17.113 10.1317 18.1242 10.3055C19.1355 10.4792 20.0534 11.0028 20.7177 11.7848C21.382 12.5668 21.7503 13.5573 21.7583 14.5833C21.7583 17.5 17.3833 18.9583 17.3833 18.9583"
        stroke="#990000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 24.7917H17.5146"
        stroke="#990000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShieldQuestion;
