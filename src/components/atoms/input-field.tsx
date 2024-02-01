import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const InputField = ({
  form,
  name,
  label,
  type,
  placeholder,
  textarea,
}: {
  form: any;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea
                placeholder={placeholder || ""}
                {...field}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                placeholder={placeholder || ""}
                {...field}
                type={type || "text"}
                onChange={(e: any) => {
                  form.setValue(
                    name,
                    type === "number"
                      ? parseFloat(e.target.value)
                      : e.target.value
                  );
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
