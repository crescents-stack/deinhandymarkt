import { toast } from "@/components/ui/use-toast";

export const ActionResponseHandler = (
  response: any,
  title: string,
  onlyError?: boolean
) => {
  const success = response.success;
  let paths = "";
  if (!success) {
    paths = response.errorMessages?.length
      ? response.errorMessages.map((item: any) => {
          return ` '${item.path}': ${item.message}\n`;
        })
      : "";
  }

  if (!onlyError) {
    toast({
      title,
      description: response.message + paths,
      variant: success ? "default" : "destructive",
    });
  } else {
    if (!success) {
      toast({
        title,
        description: response.message + paths,
        variant: "destructive",
      });
    }
  }
};

export const SomethingWentWrong = {
    success: false,
    message: "Someting went wrong!",
    statusCode: 500
}
