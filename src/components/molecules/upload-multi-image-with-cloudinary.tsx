/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { BASEURL } from "@/lib/data";
import { Input } from "../ui/input";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { Sun, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const UploadMultipleImages = ({
  defaultValues,
  form,
  name,
}: {
  defaultValues: string[];
  form: any;
  name: string;
}) => {
  const [file, setFile] = useState<string[]>(defaultValues ?? []);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0.1);
  const { auth } = useAuthContext();
  const router = useRouter();

  const PostToCloudinary = async (event: any) => {
    try {
      if (!auth?.accessToken) {
        router.push("/auth/login");
      }
      setLoading(true);
      const inputs = Array.from(event.target.files);
      let ImagesToSet: any = [];
      if (inputs.length) {
        for (let i = 0; i < inputs.length; i++) {
          console.count("For loop");
          const temp = new FormData();
          temp.append("file", inputs[i] as File);
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
          if (result.success && result.data.length) {
            const toSetURL: string = result.data[0].files[0].url;
            ImagesToSet = [...ImagesToSet, toSetURL];
            setProgress((i + 1) * (100 / inputs.length));
          }
        }
      }
      if (ImagesToSet.length) {
        setFile(ImagesToSet);
        form.setValue(name, ImagesToSet);
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
          <div className="space-y-1">
            <Progress value={progress} />

            <div className="flex items-center gap-1 p-2">
              <Sun className="w-4 h-4 animate-spin" /> uploding...
            </div>
          </div>
        ) : file.length ? (
          <div className="flex flex-wrap items-start justify-start gap-1">
            {file.map((item: string, index: number) => {
              return (
                <div
                  key={index}
                  className="relative rounded-[10px] border border-muted"
                >
                  <X
                    className="absolute top-0 right-0 m-[4px] w-4 h-4 bg-white rounded-full stroke-gray-400"
                    role="button"
                    onClick={() => {
                      setFile([...file.filter((url: string) => url !== item)]);
                    }}
                  />
                  <Image
                    key={index}
                    src={item}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-[100px] h-auto"
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <Input
        accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
        type="file"
        multiple
        onChange={PostToCloudinary}
        className="mt-1"
      />
    </div>
  );
};

export default UploadMultipleImages;
