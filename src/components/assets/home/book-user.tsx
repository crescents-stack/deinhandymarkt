import { cn } from "@/lib/utils";

const BookUser = ({ className }: { className: string }) => {
  return (
    <svg
    width="50"
    height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <g id="book-user">
        <path
          id="Vector"
          d="M8.33333 40.625V9.37502C8.33333 7.99368 8.88206 6.66892 9.85881 5.69217C10.8356 4.71542 12.1603 4.16669 13.5417 4.16669H41.6667V45.8334H13.5417C12.1603 45.8334 10.8356 45.2846 9.85881 44.3079C8.88206 43.3311 8.33333 42.0064 8.33333 40.625ZM8.33333 40.625C8.33333 39.2437 8.88206 37.9189 9.85881 36.9422C10.8356 35.9654 12.1603 35.4167 13.5417 35.4167H41.6667"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M25 20.8333C27.3012 20.8333 29.1667 18.9679 29.1667 16.6667C29.1667 14.3655 27.3012 12.5 25 12.5C22.6988 12.5 20.8333 14.3655 20.8333 16.6667C20.8333 18.9679 22.6988 20.8333 25 20.8333Z"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M31.25 27.0833C31.25 25.4257 30.5915 23.836 29.4194 22.6639C28.2473 21.4918 26.6576 20.8333 25 20.8333C23.3424 20.8333 21.7527 21.4918 20.5806 22.6639C19.4085 23.836 18.75 25.4257 18.75 27.0833"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default BookUser;
