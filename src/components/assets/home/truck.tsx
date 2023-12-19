import { cn } from "@/lib/utils";

const Truck = ({ className }: { className: string }) => {
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
          d="M10.4167 37.5H6.25001C5.00001 37.5 4.16667 36.6667 4.16667 35.4167V14.5833C4.16667 13.3333 5.00001 12.5 6.25001 12.5H27.0833C28.3333 12.5 29.1667 13.3333 29.1667 14.5833V37.5"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M29.1667 18.75H37.5L45.8333 27.0833V35.4167C45.8333 36.6667 45 37.5 43.75 37.5H39.5833"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M30.25 37.5H18.75"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M14.5833 41.6666C16.8845 41.6666 18.75 39.8012 18.75 37.5C18.75 35.1988 16.8845 33.3333 14.5833 33.3333C12.2822 33.3333 10.4167 35.1988 10.4167 37.5C10.4167 39.8012 12.2822 41.6666 14.5833 41.6666Z"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M35.4167 41.6666C37.7179 41.6666 39.5833 39.8012 39.5833 37.5C39.5833 35.1988 37.7179 33.3333 35.4167 33.3333C33.1155 33.3333 31.25 35.1988 31.25 37.5C31.25 39.8012 33.1155 41.6666 35.4167 41.6666Z"
          stroke="#990000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Truck;
