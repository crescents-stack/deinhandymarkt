import { ReactChildren } from "../types";
import { AuthContextProvider } from "./auth-context-provider";

const ContextWrapper = ({ children }: ReactChildren) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default ContextWrapper;
