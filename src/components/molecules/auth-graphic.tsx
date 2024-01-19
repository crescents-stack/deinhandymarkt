import Link from "next/link";
import CirclesTriangle from "../assets/auth/circles-triangle";

const AuthGraphic = ({
  H1,
  text,
  link,
  linkText,
}: {
  H1: string;
  text: string;
  link: string;
  linkText: string;
}) => {
  return (
    <div className="mx-auto md:mx-0 min-w-[300px] flex items-center gap-[32px]">
      <CirclesTriangle className="max-w-[150px] h-auto" />
      <div className="max-w-[250px] flex flex-col gap-[16px]">
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
          {H1}
        </h1>
        <p className="text-[14px] md:text-[20px] font-medium">
          {text}
          <Link href={link || "#"}>
            <span className="text-[14px] md:text-[20px] font-bold text-secondary">
              {linkText}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthGraphic;
