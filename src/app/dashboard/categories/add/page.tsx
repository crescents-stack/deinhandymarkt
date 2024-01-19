"use client";

import { PostCategory } from "@/app/actions/action";
import ErrorBar from "@/components/atoms/error-bar";
import BadgeDev from "@/components/molecules/badge-dev";
import TagInput from "@/components/molecules/tag-input";
import UploadImage from "@/components/molecules/upload-image";
import { Button } from "@/components/ui/button";
import { useLoadingContext } from "@/lib/contexts/loading.provider";
import { FormSubmit, FetchReturnType } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { setLoading } = useLoadingContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "",
    // parentId: "",
    blog: "",
    tags: [],
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState(formData);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (event: FormSubmit) => {
    event.preventDefault();
    const validationErrors = validation(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      const { name, slug, icon, blog, tags, title, description } = formData;
      const body = {
        name,
        slug,
        icon,
        blog,
        tags,
        metadata: {
          title,
          description,
        },
      };
      const response = await PostCategory(body);
      console.log(response);
      // if (response) {
      //   response.success && router.push("/dashboard/categories?paginatedAt=1");
      // }
    }
    setErrors(validationErrors);
  };
  const validation = (data: any) => {
    let obj: any = {};
    // name: "",
    if (!data.name) {
      obj.name = "Name is required";
    }
    // slug: "",
    if (!data.slug) {
      obj.slug = "Slug is required";
    }
    // icon: "",
    if (!data.icon) {
      obj.icon = "Icon is required";
    }
    // parentId: "",
    // if (!data.parentId) {
    //   obj.parentId = "Parent ID is required";
    // }
    // blog: "",
    if (!data.blog) {
      obj.blog = "Blog is required";
    }
    // tags: [],
    if (!data.tags.length) {
      obj.tags = "Add at least on tag";
    }
    // title: "",
    if (!data.title) {
      obj.title = "Title is required";
    }
    // description: "",
    if (!data.description) {
      obj.description = "Description is required";
    }
    return obj;
  };
  return (
    <div className="max-w-[300px] md:max-w-[600px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Add New Category
      </h1>
      <form
        onSubmit={handleOnSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-[16px]"
      >
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
          <label htmlFor="parentId">
            Parent ID&nbsp;
            <BadgeDev />
          </label>
          <input
            type="text"
            name="parentId"
            onChange={handleOnChange}
            readOnly={true}
          />
          <ErrorBar errors={errors} name="parentId" />
        </div>

        <div className="input-field">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="e.g. /case"
            onChange={handleOnChange}
          />
          <ErrorBar errors={errors} name="slug" />
        </div>

        <div className="flex flex-col gap-[4px]">
          <label htmlFor="status" className="font-semibold">
            Tags
          </label>
          <TagInput onChange={handleOnChange} name="tags" />
          <ErrorBar errors={errors} name="tags" />
        </div>
        <div className="input-field">
          <label htmlFor="icon">Icon</label>
          <UploadImage
            func={handleOnChange}
            name="icon"
            accept=".svg"
            sizeLimit={100}
          />
          <ErrorBar errors={errors} name="icon" />
        </div>
        <div className="input-field">
          <label htmlFor="blog">Blog</label>
          <textarea
            name="blog"
            onChange={handleOnChange}
            className="min-h-[100px]"
          />
          <ErrorBar errors={errors} name="blog" />
        </div>
        <div className="pt-4 mt-4 border-t flex flex-col gap-[4px]">
          <h2 className="font-bold text-[16px] md:text-[18px]">Metadata</h2>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={handleOnChange} />
            <ErrorBar errors={errors} name="title" />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleOnChange}
              className="min-h-[100px]"
            />
            <ErrorBar errors={errors} name="description" />
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
