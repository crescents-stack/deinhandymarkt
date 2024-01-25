import Link from "next/link";

const AddRouter = ({link, text}: {link: string, text: string}) => {
  return (
    <Link href={link}
    className="px-6 py-2 rounded-[10px] bg-primary text-white"
    >
      {text}
    </Link>
  );
};

export default AddRouter;
