import { ReactChildren } from "../types";
import { AuthContextProvider } from "./auth-context-provider";
import CartContextProvider from "./cart-context-provider";

const ContextWrapper = ({ children }: ReactChildren) => {
  return (
    <CartContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </CartContextProvider>
  );
};

export default ContextWrapper;
