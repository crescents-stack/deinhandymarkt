/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

const UploadImage = ({
  type,
  func,
  name,
  defaultValue,
  accept,
  sizeLimit = 1,
}: {
  type?: string;
  func: Function;
  name: string;
  defaultValue?: any;
  accept?: string;
  sizeLimit?: number;
}) => {
  const [postImage, setPostImage] = useState({
    myFile: defaultValue ? defaultValue : "",
  });
  const [imageName, setImageName] = useState("Upload picture");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = async (e: any) => {
    setErrorMessage("");
    const file = e.target.files[0];
    const limit = sizeLimit * 1024;
    if (file.size < limit) {
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, myFile: base64 });
      setImageName(file.name);
    } else {
      setErrorMessage(`File size can't be more than ${sizeLimit} KB!`);
    }
  };

  const removeImage = (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    setPostImage({ ...postImage, myFile: "" });
    setImageName("Upload picture");
  };

  useEffect(() => {
    func({
      target: {
        name: name,
        value: postImage.myFile,
      },
    });
  }, [postImage]);

  const imageStyle = `${
    type === "profile"
      ? "w-[100px] h-[100px] rounded-full "
      : " w-[200px] h-auto rounded-md"
  } border-2 border-blue-200`;
  return (
    <div className="rounded-md border bg-white p-2">
      {postImage.myFile ? (
        <img src={postImage.myFile} alt="" className={imageStyle} />
      ) : null}
      <div className="relative mt-5 rounded-md border px-3 py-1">
        {imageName !== "Upload picture" ? (
          <span className="font-medium">Uploaded Picture:</span>
        ) : null}{" "}
        {imageName}
        <input
          type="file"
          // label='Image'
          name="myFile"
          id="file-upload"
          accept={accept || ".jpeg, .png, .jpg, .webp"}
          onChange={handleFileUpload}
          className="absolute left-0 top-0 h-full w-full cursor-pointer border opacity-0"
        />
      </div>
      {postImage?.myFile || defaultValue ? (
        <button
          onClick={(e) => removeImage(e)}
          className="my-3 rounded-md bg-red-600 px-2 py-[3px] text-white"
        >
          Remove Image
        </button>
      ) : null}
      {errorMessage ? (
        <div className="text-secondary py-2">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default UploadImage;

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
