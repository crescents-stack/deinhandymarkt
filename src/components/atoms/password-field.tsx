"use client";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const PasswordField = ({ form, name }: { form: any; name: string }) => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="relative">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type={showText ? "text" : "password"} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Eye
        className={clsx(
          "absolute top-0 right-0 w-[16px] h-[16px]  hover:stroke-gray-400",
          {
            "hidden stroke-gray-500": !showText,
            "block stroke-gray-300": showText,
          }
        )}
        role="button"
        onClick={() => setShowText(!showText)}
      />
      <EyeOff
        className={clsx(
          "absolute top-0 right-0 w-[16px] h-[16px]  hover:stroke-gray-400",
          {
            "hidden stroke-gray-500": showText,
            "block stroke-gray-300": !showText,
          }
        )}
        role="button"
        onClick={() => setShowText(!showText)}
      />
    </div>
  );
};

export default PasswordField;
