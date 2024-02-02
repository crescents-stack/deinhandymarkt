"use client";

import InputField from "@/components/atoms/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PRINT } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormSchema, TContactFormSchema } from "../types/types";
import { ContactAction } from "../actions/actions";
import { ActionResponseHandler } from "@/lib/error";

const ContactForm = () => {
  const form = useForm<TContactFormSchema>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      orderId: "",
      message: "",
    },
  });

  const onSubmit = async (data: TContactFormSchema) => {
    PRINT(data);
    const response = await ContactAction(data);
    ActionResponseHandler(response, "Contact");
    if (response.success) {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        orderId: "",
        message: "",
      });
    }
  };
  return (
    <div className="p-8 rounded-[10px] bg-white order-1 md:order-2">
      <h2 className="text-[20px] md:text-[24px] font-bold text-secondary">
        Contact us for any questions!
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-8">
          <InputField form={form} name="firstName" label="First name" />
          <InputField form={form} name="lastName" label="Last name" />
          <InputField form={form} name="email" label="Email" />
          <InputField form={form} name="orderId" label="Order ID" />
          <InputField form={form} name="message" label="Message" textarea />
          <Button
            type="submit"
            variant="secondary"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
