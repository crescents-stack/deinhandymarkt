"use client";

import { X } from "lucide-react";
import ClickLink from "./click-link";
import { useRouter } from "next/navigation";

const FilterList = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const categoriesInURL = searchParams.category || "";
  const tagsInURL = searchParams.tags || "";
  const searchInURL = searchParams.search || "";
  return (
    <ul className="space-x-4 flex flex-wrap items-center">
      {categoriesInURL.length || tagsInURL.length ? (
        <li className="inline-block">
          <ClickLink>
            <div
              onClick={() => {
                router.push(`/search?search=""&category=""&tags=""`);
              }}
              className="inline-block"
              role="button"
            >
              <li className="inline-block px-[12px] py-[6px] bg-secondary/5 rounded-[4px] text-secondary font-semibold hover:bg-secondary hover:text-white transition ease-in-out duration-500">
                Get all
              </li>
            </div>
          </ClickLink>
        </li>
      ) : null}
      {categoriesInURL.length
        ? categoriesInURL.split(",").map((category: string, index: number) => {
            return category.trim() ? (
              <li key={index} className="inline-block">
                <ClickLink key={category}>
                  <div className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500 inline-flex flex-row items-center gap-2">
                    <span className="capitalize">{category}</span>
                    <div
                      onClick={() => {
                        router.push(
                          `/search?search=${searchInURL}&category=${categoriesInURL
                            .split(",")
                            .filter((item: string) => item !== category)
                            .join(",")}&tags=${tagsInURL}`
                        );
                      }}
                      className="inline-block"
                      role="button"
                    >
                      <X className="w-4 h-4" />
                    </div>
                  </div>
                </ClickLink>
              </li>
            ) : null;
          })
        : null}
      {tagsInURL.length
        ? tagsInURL.split(",").map((tag: string, index: number) => {
            return tag.trim() ? (
              <li key={index} className="inline-block">
                <ClickLink key={tag}>
                  <div
                    key={tag}
                    className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500 inline-flex flex-row items-center gap-2"
                  >
                    <span className="capitalize">{tag}</span>
                    <div
                      onClick={() => {
                        router.push(
                          `/search?search=${searchInURL}&category=${categoriesInURL}&tags=${tagsInURL
                            .split(",")
                            .filter((item: string) => item !== tag)
                            .join(",")}`
                        );
                      }}
                      className="inline-block"
                      role="button"
                    >
                      <X className="w-4 h-4" />
                    </div>
                  </div>
                </ClickLink>
              </li>
            ) : null;
          })
        : null}
    </ul>
  );
};

export default FilterList;
