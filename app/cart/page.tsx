import { Button } from "@/components/ui/button";
import { Customer, Order } from "@/lib/types";
import Link from "next/link";
import { getCustomer } from "../_actions/getCustomer";
import { getOrdersByCustomer } from "../_actions/getOrdersByCustomer";
import { sendOrder } from "../_actions/sendOrder";

export default async function Cart() {
  const customer = (await getCustomer()) as Customer;
  const ordersByCustomer = (await getOrdersByCustomer(customer.id)) as Order[];

  return (
    <div>
      <h3>Your Order for CustomerID: {customer.id}</h3>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="mx-auto my-4 w-[80%] border border-gray-400 p-2">
          <div className="m-4 flex items-center justify-between gap-4 border border-gray-400 p-2">
            <div className="flex gap-2">
              {ordersByCustomer.map((obc) =>
                obc.orderItems.map((item) => (
                  <div key={item.id} className="m-2 flex flex-row gap-2 border border-green-200 bg-green-200 p-2">
                    <span>{item.bookId} </span>x<span>{item.quantity}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <form action={sendOrder}>
            <Button className="bg-gray-400" type="submit">
              Finish Shopping
            </Button>
          </form>
          <Link href={`/books`}>
            <Button className="bg-accent">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
