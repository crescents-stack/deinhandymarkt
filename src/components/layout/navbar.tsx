import Image from "next/image";
import BrandLogo from "../assets/brand-logo";
import Icon from "../skeletons/icon";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-muted">
      <div className="container flex items-center justify-between gap-[20px] py-[12px]">
        <ul className="flex items-center gap-[20px]">
          {[
            { id: 1, icon: <Icon />, text: "Account" },
            { id: 2, icon: <Icon />, text: "Customer Services" },
            { id: 3, icon: <Icon />, text: "Help" },
          ].map((item) => {
            const { id, icon, text } = item;
            return (
              <li key={id} className="flex items-center gap-[8px]">
                {icon}
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
        <ul className="flex items-center gap-[8px]">
          {[
            { id: 1, image: "/images/certification/image1.png" },
            { id: 2, image: "/images/certification/ssl.svg" },
            { id: 3, image: "/images/certification/trusted-shops.svg" },
          ].map((item) => {
            const { id, image } = item;
            return (
              <li key={id} className="h-[30px] w-[30px] rounded">
                <Image
                  src={image}
                  alt="certification-image"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
              </li>
            );
          })}
        </ul>
        <ul>
          <li className="text-primary text-[12px]">
            Order within the next&nbsp;
            <span className="text-secondary font-semibold text-[12px]">
              8 hours and 33 minutes
            </span>
          </li>
          <li className="flex items-center gap-[8px]">
            <Icon />
            <p className="text-gray-500 text-[12px]">
              For guaranteed same day shipping.
            </p>
          </li>
        </ul>
      </div>
      <div className="shadow-lg bg-white">
        <div className="container py-[16px] flex items-center justify-between gap-[90px]">
          <BrandLogo className="max-h-[40px] w-auto" />
          <div className="flex items-center gap-[32px]">
            <div className="relative">
              <Icon />
              <div className="absolute -top-[8px] -right-[8px] bg-secondary text-white pl-[4px] pr-[2px] pt-[2px] rounded-[8px] text-[10px] font-semibold">
                99+
              </div>
            </div>
            <div className="flex items-center gap-[20px]">
              <button className="px-[24px] py-[12px] rounded-[8px] bg-primary text-muted hover:bg-primary/80 active:scale-[95%] text-[16px] font-semibold transition ease-in-out duration-150">
                Register
              </button>
              <button className="px-[24px] py-[12px] rounded-[8px] bg-secondary text-muted hover:bg-secondary/80 active:scale-[95%] text-[16px] font-semibold transition ease-in-out duration-150">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
