"use client";
import { Button } from "../ui/button";
import { PRINT } from "@/lib/utils";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";

const AddToCart = ({
  whichToAdd,
  quantity,
}: {
  whichToAdd: TCartContextValue;
  quantity: number;
}) => {
  const { cart, setCart } = useCartContext();
  const { toast } = useToast();
  // adding new item to cart handler
  const AddNewItemToCart = (newItem: TCartContextValue) => {
    if (cart.length) {
      if (
        !cart.find(
          (existingItem: TCartContextValue) =>
            existingItem?._id === newItem?._id
        )
      ) {
        setCart([...cart, { ...newItem, quantity }]);
      }
    } else {
      setCart([{ ...newItem, quantity }]);
    }
    toast({
      title: "Cart",
      description: "Item added to cart",
      action: <ToastAction altText="View cart items">
        <Link href={"#cart"}>View</Link>
      </ToastAction>,
    });
  };

  const RemoveItemFromCart = (_id: string) => {
    cart.length &&
      setCart(cart.filter((item: TCartContextValue) => item._id !== _id));
  };

  const handleAction = () => {
    if (cart.length) {
      if (cart.find((item: TCartContextValue) => item._id === whichToAdd._id)) {
        RemoveItemFromCart(whichToAdd._id as string);
      } else {
        AddNewItemToCart(whichToAdd);
      }
    } else {
      AddNewItemToCart(whichToAdd);
    }
  };

  PRINT(cart);
  return (
    <div>
      <Button
        variant={
          cart.find((item: TCartContextValue) => item._id === whichToAdd._id)
            ? "outline"
            : "secondary"
        }
        onClick={handleAction}
      >
        {cart.find((item: TCartContextValue) => item._id === whichToAdd._id)
          ? "Remove from cart"
          : "Add to cart"}
      </Button>
    </div>
  );
};

export default AddToCart;
