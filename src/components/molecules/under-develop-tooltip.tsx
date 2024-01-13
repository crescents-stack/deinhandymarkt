import { ReactChildren } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const UnderDevelopToolTip = ({ children }: ReactChildren) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-pink-600 [&>p]:text-white font-semibold">
          <p>DEV</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UnderDevelopToolTip;
