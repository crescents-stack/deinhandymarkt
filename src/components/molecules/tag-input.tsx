"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const TagInput = ({
  onChange,
  name,
  defaultValue = [],
  placeholder,
}: {
  onChange: Function;
  name: string;
  defaultValue?: string[];
  placeholder?: string;
}) => {
  const [tags, setTags] = useState<string[]>(defaultValue);
  const [inputData, setInputData] = useState("");
  const addTag = (tag: any) => {
    if (!tags.find((item: string) => tag === item)) {
      const dataToSet = [...tags, tag];
      onChange({
        target: {
          name,
          value: dataToSet,
        },
      });
      setTags(dataToSet);
    }
  };
  const removeTag = (tag: any) => {
    if (tags.find((item: string) => tag === item)) {
      const dataToSet = [...tags.filter((item: string) => item !== tag)];
      onChange({
        target: {
          name,
          value: dataToSet,
        },
      });
      setTags(dataToSet);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-[4px]">
      <ul className="px-[16px] py-[8px] rounded-[10px] border border-dark_gray flex flex-wrap gap-[4px]">
        {tags.length
          ? tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className="px-[8px] py-[4px] rounded bg-muted inline-flex items-center justify-center gap-[8px] group"
                >
                  <span className="text-gray-500 group-hover:text-primary">
                    {tag}
                  </span>
                  <X
                    className="w-4 h-4 text-muted stroke-gray-500 group-hover:stroke-primary"
                    role="button"
                    onClick={() => removeTag(tag)}
                  />
                </li>
              );
            })
          : placeholder || "Add a tag!"}
      </ul>
      <div className="flex flex-row items-center gap-[4px]">
        <input
          type="text"
          name="tag"
          // placeholder="e.g. Case"
          onChange={(e: any) => setInputData(e.target.value)}
          className="w-full px-[10px] py-[7.2px] border border-dark_gray rounded-[8px]"
        />
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            inputData && addTag(inputData);
          }}
          className="max-w-[60px] hover:bg-gray-500"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TagInput;
