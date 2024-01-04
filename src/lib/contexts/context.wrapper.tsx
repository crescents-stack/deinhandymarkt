import { ReactChildren } from "../types";
import LoadingProvider from "./loading.provider";

const ContextWrapper = ({ children }: ReactChildren) => {
  return <LoadingProvider>{children}</LoadingProvider>;
};

export default ContextWrapper;
