import { ReactChildren } from "../types";
import CartProvider from "./cart.provider";
import LoadingProvider from "./loading.provider";
import UserContextProvider from "./user.provider";

const ContextWrapper = ({ children }: ReactChildren) => {
  return (
    <UserContextProvider>
      <LoadingProvider>
        <CartProvider>
          <>{children}</>
        </CartProvider>
      </LoadingProvider>
    </UserContextProvider>
  );
};

export default ContextWrapper;
