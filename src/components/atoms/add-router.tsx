"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddRouter = ({link, text}: {link: string, text: string}) => {
  const Router = useRouter();
  return (
    <Button
      onClick={() => {
        Router.push(link);
      }}
    >
      {text}
    </Button>
  );
};

export default AddRouter;
