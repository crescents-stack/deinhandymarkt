import { cn } from "@/lib/utils";

const Stripe = ({ className }: { className: string }) => {
  return (
    <svg
      width="64"
      height="28"
      viewBox="0 0 64 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "")}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.5421 14.3863C63.5421 9.86982 61.3601 6.30603 57.1897 6.30603C53.0017 6.30603 50.4678 9.86982 50.4678 14.351C50.4678 19.6614 53.4592 22.3431 57.7528 22.3431C59.8468 22.3431 61.4305 21.8667 62.627 21.1963V17.6678C61.4305 18.2676 60.0579 18.6381 58.3159 18.6381C56.609 18.6381 55.0957 18.0383 54.9021 15.9565H63.5069C63.5069 15.7271 63.5421 14.8097 63.5421 14.3863ZM54.8493 12.7103C54.8493 10.7167 56.0635 9.88746 57.1721 9.88746C58.2455 9.88746 59.3893 10.7167 59.3893 12.7103H54.8493Z"
        fill="#6B7280"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.6744 6.30603C41.95 6.30603 40.8414 7.11759 40.2255 7.68215L39.9967 6.58831H36.1255V27.1595L40.5246 26.2244L40.5422 21.2316C41.1757 21.6903 42.1083 22.3431 43.6568 22.3431C46.8066 22.3431 49.6749 19.8025 49.6749 14.2099C49.6573 9.09355 46.7539 6.30603 43.6744 6.30603ZM42.6186 18.4617C41.5804 18.4617 40.9646 18.0912 40.5422 17.6325L40.5246 11.0871C40.9822 10.5755 41.6156 10.2227 42.6186 10.2227C44.2199 10.2227 45.3285 12.0222 45.3285 14.3334C45.3285 16.6975 44.2375 18.4617 42.6186 18.4617Z"
        fill="#6B7280"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.0718 5.26532L34.4885 4.31263V0.731201L30.0718 1.66625V5.26532Z"
        fill="#6B7280"
      />
      <path
        d="M34.4885 6.6062H30.0718V22.0434H34.4885V6.6062Z"
        fill="#6B7280"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.3388 7.91161L25.0572 6.60607H21.2563V22.0433H25.6555V11.5813C26.6937 10.2228 28.4534 10.4698 28.9989 10.6638V6.60607C28.4358 6.39436 26.377 6.00622 25.3388 7.91161Z"
        fill="#6B7280"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5412 2.77783L12.2476 3.69524L12.23 17.8269C12.23 20.438 14.1832 22.361 16.7875 22.361C18.2304 22.361 19.2862 22.0964 19.8669 21.7788V18.1974C19.3038 18.4267 16.5236 19.2383 16.5236 16.6272V10.3641H19.8669V6.60626H16.5236L16.5412 2.77783Z"
        fill="#6B7280"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.64531 11.0873C4.64531 10.3992 5.2084 10.1346 6.14102 10.1346C7.47837 10.1346 9.16764 10.5404 10.505 11.2637V7.11771C9.04447 6.5355 7.60154 6.30615 6.14102 6.30615C2.56891 6.30615 0.193359 8.17626 0.193359 11.299C0.193359 16.1683 6.88008 15.392 6.88008 17.4915C6.88008 18.3031 6.17622 18.5677 5.1908 18.5677C3.73028 18.5677 1.86504 17.9678 0.386922 17.1563V21.3552C2.02341 22.0609 3.67749 22.3608 5.1908 22.3608C8.8509 22.3608 11.3672 20.5437 11.3672 17.3856C11.3496 12.1282 4.64531 13.0632 4.64531 11.0873Z"
        fill="#6B7280"
      />
    </svg>
  );
};

export default Stripe;