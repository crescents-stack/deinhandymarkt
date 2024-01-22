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
  placeholder,
  textarea,
}: {
  form: any;
  name: string;
  label: string;
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
                className="min-h-[200px]"
              />
            ) : (
              <Input placeholder={placeholder || ""} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
