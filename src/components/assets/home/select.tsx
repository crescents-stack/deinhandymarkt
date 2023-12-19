import { cn } from "@/lib/utils";

const Select = ({ className }: { className: string }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <g id="Frame">
        <path
          id="Vector"
          d="M16.6667 4.16669H8.33335C6.03217 4.16669 4.16669 6.03217 4.16669 8.33335V16.6667C4.16669 18.9679 6.03217 20.8334 8.33335 20.8334H16.6667C18.9679 20.8334 20.8334 18.9679 20.8334 16.6667V8.33335C20.8334 6.03217 18.9679 4.16669 16.6667 4.16669Z"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M29.1667 4.16669C31.4584 4.16669 33.3334 6.04169 33.3334 8.33335V16.6667C33.3334 18.9584 31.4584 20.8334 29.1667 20.8334"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M41.6667 4.16669C43.9584 4.16669 45.8334 6.04169 45.8334 8.33335V16.6667C45.8334 18.9584 43.9584 20.8334 41.6667 20.8334"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M20.8334 37.5H10.4167C6.87502 37.5 4.16669 34.7917 4.16669 31.25V29.1667"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M14.5833 43.75L20.8333 37.5L14.5833 31.25"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_6"
          d="M41.6667 29.1667H33.3334C31.0322 29.1667 29.1667 31.0322 29.1667 33.3334V41.6667C29.1667 43.9679 31.0322 45.8334 33.3334 45.8334H41.6667C43.9679 45.8334 45.8334 43.9679 45.8334 41.6667V33.3334C45.8334 31.0322 43.9679 29.1667 41.6667 29.1667Z"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Select;
