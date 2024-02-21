"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PRINT, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UpdateSameDayShippingTime } from "../actions/actions";
import { ActionResponseHandler } from "@/lib/error";
import { useContextStore } from "@/lib/hooks/hooks";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

export function SameDayShippingTimeForm() {
  const { removeContext } = useContextStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await UpdateSameDayShippingTime({
      _id: "65c39864655049caefc7df58",
      date: data.date.toDateString(),
    });
    PRINT(response);
    ActionResponseHandler(response, "Same Day Shipping Time");
    if ([400, 401].includes(response.statusCode)) {
      removeContext("auth");
      router.push("/auth/login");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-8 rounded-[10px] bg-white"
      >
        <h4 className="text-[14px] md:text-[16px] font-semibold">
          Same day shipping time
        </h4>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Shipping will be accept for guranteed same day shipping. This
                date will be removed when exceeding
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}

export default SameDayShippingTimeForm;
