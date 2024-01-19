"use client";

import ErrorBar from "@/components/atoms/error-bar";
import BadgeDev from "@/components/molecules/badge-dev";
import TagInput from "@/components/molecules/tag-input";
import UploadImage from "@/components/molecules/upload-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  return (
    <div className="max-w-[300px] md:max-w-[600px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Add New Category
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="e.g. Case" />
        </div>

        <div className="input-field">
          <label htmlFor="parentId">
            Parent ID&nbsp;
            <BadgeDev />
          </label>
          <input type="text" name="parentId" readOnly={true} />
        </div>

        <div className="input-field">
          <label htmlFor="slug">Slug</label>
          <input type="text" name="slug" placeholder="e.g. /case" />
        </div>

        <div className="flex flex-col gap-[4px]">
          <label htmlFor="status" className="font-semibold">
            Tags
          </label>
          <TagInput onChange={() => {}} name="tags" />
        </div>
        <div className="input-field">
          <label htmlFor="icon">Icon</label>
          <UploadImage
            func={() => {}}
            name="icon"
            accept=".svg"
            sizeLimit={100}
          />
        </div>
        <div className="input-field">
          <label htmlFor="blog">Blog</label>
          <textarea name="blog" className="min-h-[100px]" />
        </div>
        <div className="pt-4 mt-4 border-t flex flex-col gap-[4px]">
          <h2 className="font-bold text-[16px] md:text-[18px]">Metadata</h2>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="min-h-[100px]" />
          </div>
          <div className="grid grid-cols-2 gap-[16px] mt-5">
            <Link href="/dashboard/categories">
              <div className="flex items-center justify-center gap-[12px] px-[16px] py-[8px] rounded-[10px] bg-muted text-secondary">
                Discard
              </div>
            </Link>
            <Button>Add Category</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
