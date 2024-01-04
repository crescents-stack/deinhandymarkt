import { ReactChildren } from "../types";
import LoadingProvider from "./loading.provider";
import UserContextProvider from "./user.provider";

const ContextWrapper = ({ children }: ReactChildren) => {
  return (
    <UserContextProvider>
      <LoadingProvider>
        <>{children}</>
      </LoadingProvider>
    </UserContextProvider>
  );
};

export default ContextWrapper;
