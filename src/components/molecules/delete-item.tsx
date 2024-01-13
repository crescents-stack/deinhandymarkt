"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DELETE } from "@/lib/api/fetcher";
import { FetchReturnType } from "@/lib/types";
import { Trash } from "lucide-react";

const DeleteItem = ({
  url,
  list,
  setList,
}: {
  url: string;
  list: any;
  setList: Function;
}) => {
  const handleDelete = async () => {
    const response: FetchReturnType = await DELETE(url);
    console.log(response);
    if (response.success) {
      const splitedURL = url.split("/");
      const ID = splitedURL[splitedURL.length - 1];
      setList([...list.filter((item: any) => item.rowData[0].td !== ID)]);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          className="w-[16px] h-[16px] stroke-gray-400 hover:stroke-secondary transition ease-in-out duration-500"
          role="button"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/70"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItem;
