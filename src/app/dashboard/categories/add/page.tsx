"use client";

import ErrorBar from "@/components/atoms/error-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "",
    parentId: "",
    blog: "",
    status: "",
    tags: [],
  });
  const [errors, setErrors] = useState(formData);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validation(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
    }
    setErrors(validation);
  };
  const validation = (data: any) => {
    let obj: any = {};
    return obj;
  };
  return (
    <div className="max-w-[300px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Add New Category
      </h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-[16px]">
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Case"
            onChange={handleOnChange}
          />
          <ErrorBar errors={errors} name="name" />
        </div>
        <div className="input-field">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="e.g. /case"
            onChange={handleOnChange}
          />
          <ErrorBar errors={errors} name="name" />
        </div>
        <div className="input-field">
          <label htmlFor="icon">Icon</label>
          <input type="file" name="icon" onChange={handleOnChange} />
          <ErrorBar errors={errors} name="icon" />
        </div>
        <div className="input-field">
          <label htmlFor="parentId">Parent ID</label>
          <input type="text" name="parentId" onChange={handleOnChange} />
          <ErrorBar errors={errors} name="parentId" />
        </div>
        <div className="input-field">
          <label htmlFor="blog">Blog</label>
          <input type="text" name="blog" onChange={handleOnChange} />
          <ErrorBar errors={errors} name="blog" />
        </div>
        <div className="input-field">
          <label htmlFor="status">Status</label>
          <input type="text" name="status" onChange={handleOnChange} />
          <ErrorBar errors={errors} name="status" />
        </div>
        <div className="flex gap-[16px] mt-5">
          <Link href="/dashboard/categories">
            <div className="inline-flex items-center justify-center gap-[12px] px-[16px] py-[8px] rounded-[10px] bg-muted text-secondary">
              Discard
            </div>
          </Link>
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
