import { cn } from "@/lib/utils";

const CalendarClock = ({className}:{className: string}) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <g id="calendar-clock">
        <path
          id="Vector"
          d="M43.75 15.625V12.5C43.75 11.3949 43.311 10.3351 42.5296 9.5537C41.7482 8.7723 40.6884 8.33331 39.5833 8.33331H10.4167C9.3116 8.33331 8.25179 8.7723 7.47039 9.5537C6.68899 10.3351 6.25 11.3949 6.25 12.5V41.6666C6.25 42.7717 6.68899 43.8315 7.47039 44.6129C8.25179 45.3943 9.3116 45.8333 10.4167 45.8333H17.7083"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M33.3333 4.16669V12.5"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M16.6667 4.16669V12.5"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M6.25 20.8333H16.6667"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M36.4583 36.4584L33.3333 33.8542V29.1667"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_6"
          d="M45.8333 33.3333C45.8333 36.6485 44.5164 39.8279 42.1722 42.1721C39.828 44.5164 36.6485 45.8333 33.3333 45.8333C30.0181 45.8333 26.8387 44.5164 24.4945 42.1721C22.1503 39.8279 20.8333 36.6485 20.8333 33.3333C20.8333 30.0181 22.1503 26.8387 24.4945 24.4945C26.8387 22.1503 30.0181 20.8333 33.3333 20.8333C36.6485 20.8333 39.828 22.1503 42.1722 24.4945C44.5164 26.8387 45.8333 30.0181 45.8333 33.3333Z"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CalendarClock;
