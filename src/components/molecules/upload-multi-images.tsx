/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const UploadMultiImages = ({
  func,
  name,
  defaultValue,
  accept,
  sizeLimit = 1,
}: {
  func: Function;
  name: string;
  defaultValue?: any;
  accept?: string;
  sizeLimit?: number;
}) => {
  const [postImage, setPostImage] = useState({
    myFile: defaultValue ? defaultValue : [],
  });
  const [imageName, setImageName] = useState("Upload picture");
  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = async (e: any) => {
    setMessage("");
    let files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      if (file.size < sizeLimit * 1024 * 1024) {
        const base64 = await convertToBase64(file);
        files.push(base64);
      } else {
        setMessage(
          `File size can't be more than 5 MB! Removed ${i + 1}th picture`
        );
      }
    }
    setPostImage({ ...postImage, myFile: [...postImage.myFile, ...files] });
  };

  useEffect(() => {
    func({
      target: {
        name: name,
        value: postImage.myFile,
      },
    });
  }, [postImage]);
  return (
    <div className="rounded-md border bg-white p-2">
      {postImage.myFile.length ? (
        <div className="flex flex-wrap items-center justify-start gap-1">
          {postImage.myFile.map((item: any, index: number) => {
            return (
              <div key={index} className="relative group">
                <X
                  role="button"
                  className="absolute right-0 top-0 m-1 cursor-pointer stroke-gray-400 group-hover:stroke-white bg-white group-hover:bg-pink-400 rounded-full w-5 h-5 stroke-[1.5px]"
                  onClick={() => {
                    setPostImage({
                      ...postImage,
                      myFile: [
                        ...postImage.myFile.filter(
                          (image: any) => image !== item
                        ),
                      ],
                    });
                  }}
                />
                <img
                  src={item}
                  alt=""
                  className="h-[100px] w-[100px] rounded-md"
                />
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="relative mt-5 rounded-md border px-3 py-1">
        {imageName !== "Upload picture" ? (
          <span className="font-medium">Uploaded Picture:</span>
        ) : null}
        &nbsp;
        {imageName}
        <input
          type="file"
          // label='Image'
          name="myFile"
          id="file-upload"
          accept={accept || ".jpeg, .png, .jpg, .webp, .svg, .avif"}
          multiple={true}
          onChange={handleFileUpload}
          className="absolute left-0 top-0 h-full w-full cursor-pointer border opacity-0"
        />
      </div>
      {message ? (
        <div className="text-secondary py-2">{message}</div>
      ) : null}
    </div>
  );
};

export default UploadMultiImages;

const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
