import { cn } from "@/lib/utils";

const UserRound = ({ className }: { className: string }) => {
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
        d="M13.3332 13.9998C13.3332 12.5853 12.7713 11.2288 11.7711 10.2286C10.7709 9.22841 9.41433 8.6665 7.99984 8.6665C6.58535 8.6665 5.2288 9.22841 4.2286 10.2286C3.22841 11.2288 2.6665 12.5853 2.6665 13.9998"
        stroke="#6B7280"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99984 8.66667C9.84079 8.66667 11.3332 7.17428 11.3332 5.33333C11.3332 3.49238 9.84079 2 7.99984 2C6.15889 2 4.6665 3.49238 4.6665 5.33333C4.6665 7.17428 6.15889 8.66667 7.99984 8.66667Z"
        stroke="#990000"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserRound;
