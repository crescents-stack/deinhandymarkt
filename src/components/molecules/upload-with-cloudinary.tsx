/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { BASEURL } from "@/lib/data";
import { Input } from "../ui/input";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { Sun } from "lucide-react";
import { useRouter } from "next/navigation";

const UploadSingleImage = ({
  defaultValue,
  form,
  name,
}: {
  defaultValue?: string;
  form: any;
  name: string;
}) => {
  const [file, setFile] = useState<any>(defaultValue ?? null);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthContext();
  const router = useRouter();

  const PostToCloudinary = async (event: any) => {
    try {
      if (!auth?.accessToken) {
        router.push("/auth/login");
      }
      setLoading(true);
      const temp = new FormData();
      temp.append("file", event.target.files[0]);
      const response = await fetch(`${BASEURL}/files/upload`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
          // Add other necessary headers (e.g., authorization)
        },
        body: temp, // Access data from the request body
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        result.data.length && setFile(result.data[0].files[0].url);
        form.setValue(name, result.data[0].files[0].url);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-[280px] p-4 rounded-[10px]">
      <div>
        {loading ? (
          <div className="flex items-center gap-1 p-2">
            <Sun className="w-4 h-4 animate-spin" /> uploding...
          </div>
        ) : file ? (
          <Image
            src={file}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-auto"
          />
        ) : null}
      </div>
      <Input
        accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
        type="file"
        onChange={PostToCloudinary}
      />
    </div>
  );
};

export default UploadSingleImage;
