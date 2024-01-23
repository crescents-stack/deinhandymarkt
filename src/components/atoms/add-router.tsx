"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddRouter = ({link}: {link: string}) => {
  const Router = useRouter();
  return (
    <Button
      onClick={() => {
        Router.push(link);
      }}
    >
      Add New Category
    </Button>
  );
};

export default AddRouter;
