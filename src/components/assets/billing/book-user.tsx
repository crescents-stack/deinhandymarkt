import { cn } from "@/lib/utils";

const BookUser = ({ className }: { className: string }) => {
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
        d="M2.6665 13.0002V3.00016C2.6665 2.55814 2.8421 2.13421 3.15466 1.82165C3.46722 1.50909 3.89114 1.3335 4.33317 1.3335H13.3332V14.6668H4.33317C3.89114 14.6668 3.46722 14.4912 3.15466 14.1787C2.8421 13.8661 2.6665 13.4422 2.6665 13.0002ZM2.6665 13.0002C2.6665 12.5581 2.8421 12.1342 3.15466 11.8217C3.46722 11.5091 3.89114 11.3335 4.33317 11.3335H13.3332"
        stroke="#6B7280"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99984 6.66667C8.73622 6.66667 9.33317 6.06971 9.33317 5.33333C9.33317 4.59695 8.73622 4 7.99984 4C7.26346 4 6.6665 4.59695 6.6665 5.33333C6.6665 6.06971 7.26346 6.66667 7.99984 6.66667Z"
        stroke="#990000"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.6665C10 8.13607 9.78929 7.62736 9.41421 7.25229C9.03914 6.87722 8.53043 6.6665 8 6.6665C7.46957 6.6665 6.96086 6.87722 6.58579 7.25229C6.21071 7.62736 6 8.13607 6 8.6665"
        stroke="#990000"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookUser;
