import { cn } from "@/lib/utils";

const Stars = ({ className }: { className: string }) => {
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
          d="M25 6.25L21.0167 18.3604C20.8128 18.9802 20.4662 19.5435 20.0049 20.0049C19.5435 20.4662 18.9802 20.8128 18.3604 21.0167L6.25 25L18.3604 28.9833C18.9802 29.1872 19.5435 29.5338 20.0049 29.9951C20.4662 30.4565 20.8128 31.0198 21.0167 31.6396L25 43.75L28.9833 31.6396C29.1872 31.0198 29.5338 30.4565 29.9951 29.9951C30.4565 29.5338 31.0198 29.1872 31.6396 28.9833L43.75 25L31.6396 21.0167C31.0198 20.8128 30.4565 20.4662 29.9951 20.0049C29.5338 19.5435 29.1872 18.9802 28.9833 18.3604L25 6.25Z"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M10.4167 6.25V14.5833"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M39.5834 35.4166V43.75"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M6.25 10.4167H14.5833"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M35.4166 39.5834H43.75"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Stars;
