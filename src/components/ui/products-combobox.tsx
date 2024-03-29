/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDown } from "lucide-react";
import clsx from "clsx";

export function ProductComboBox({
  options,
  placeholder = "Select Option...",
  onChange,
  name = "option",
  inForm,
  defaultValue = "",
}: {
  options: any;
  placeholder: string;
  onChange: Function;
  name: string;
  inForm?: boolean;
  defaultValue?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    onChange({
      target: {
        name,
        value,
      },
    });
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={clsx("w-full justify-between", {
            "sm:w-[200px]": !inForm,
            // "sm:w-full": inForm
          })}
        >
          {value
            ? options.find(
                (option: any) => option.value.toLowerCase() === value
              )?.label || "Search optionssss"
            : placeholder || "Search option..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder || "Search option..."}
            className="h-9"
          />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option: any) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue: any) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
