/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { z } from "zod";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";


// type TOptionItem = Record<"value" | "label", string>;
export type TOptionItem = {
  value: TLabels;
  label: string;
};
export const Labels = z.enum([
  "good_first",
  "bug",
  "documentation",
  "enhancement",
  "fixing",
]);
export const TaskFormKeys = z.enum(["attributes"]);

export type TTaskFormKeys = z.infer<typeof TaskFormKeys>;
export type TLabels = z.infer<typeof Labels>;
// export type TStatus = z.infer<typeof Status>;

const OPTIONITEMS_DEFAULT = [] satisfies TOptionItem[];

export function MultiSelect({
  OPTIONITEMS = OPTIONITEMS_DEFAULT,
  form,
  name = "attributes",
  defaultSelection,
}: {
  OPTIONITEMS: TOptionItem[];
  form: any;
  name: TTaskFormKeys;
  defaultSelection?: TLabels[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<TOptionItem[]>(
    OPTIONITEMS.filter((item: TOptionItem) =>
      defaultSelection?.includes(item.value)
    ) || []
  );
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((framework: TOptionItem) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = OPTIONITEMS.filter(
    (framework) => !selected.includes(framework)
  );

  // updating parent form
  const formSetter = () => {
    const selectedValues = selected.map((item: TOptionItem) => {
      return item.value;
    });
    form.setValue(name, selectedValues);
  };
  React.useEffect(() => {
    formSetter();
  }, [selected]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-white pb-2">
        <div className="flex gap-1 flex-wrap px-3 py-2">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground stroke-primary-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
        </div>
        <div className="px-2">
        <CommandPrimitive.Input
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          placeholder="Select items..."
          className="bg-transparent outline-none placeholder:text-muted-foreground"
        />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((framework) => {
                return (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => [...prev, framework]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {framework.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
