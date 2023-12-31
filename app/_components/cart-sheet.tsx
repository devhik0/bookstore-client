"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Order } from "@/lib/types";
import { ShoppingCart, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteOrder } from "../_actions/deleteOrder";
import { getCustomer } from "../_actions/getCustomer";
import { getOrdersByCustomer } from "../_actions/getOrdersByCustomer";

export default function CartSheet({ isLogged }: { isLogged: string }) {
  // console.log("token in cart: ", isLogged);
  const [cart, setCart] = useState<Order[]>([
    {
      createdAt: new Date(),
      customerId: 0,
      id: 0,
      orderItems: [],
      orderStatus: "IN_PROGRESS",
    },
  ]);

  useEffect(() => {
    const getOrders = async () => {
      const customer = await getCustomer();
      const orders = (await getOrdersByCustomer(customer.id)) as Order[];
      // console.log("orders here: ", orders);
      setCart(orders);
    };
    getOrders();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart color="white" className="m-4" size={"1.5rem"} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          {isLogged ? (
            <div className="h-[80vh]">
              <div className="h-full overflow-y-scroll">
                <div className=" flex items-center justify-between gap-4">
                  <div className="flex w-full flex-col">
                    {cart &&
                      cart
                        .filter((i) => i.orderStatus === "IN_PROGRESS")
                        .map((item) =>
                          item.orderItems.map((item) => (
                            <div
                              key={item.bookId}
                              className="my-1 flex w-full flex-row items-center justify-between gap-2 border-b border-b-gray-200 p-2 hover:bg-orange-200"
                            >
                              <span className="m-2">
                                {item.bookId} x {item.quantity}
                              </span>
                              <XIcon
                                color="#f87171"
                                className="mr-2"
                                onClick={() => {
                                  deleteOrder(item.id);
                                }}
                              />
                            </div>
                          ))
                        )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>You need to login to see your cart.</>
          )}
        </SheetHeader>
        <Link href={`/cart`}>
          <Button className="bg-accent absolute bottom-2 right-4 w-[90%]">Order Now</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
