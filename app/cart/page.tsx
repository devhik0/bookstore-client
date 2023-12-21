import { Button } from "@/components/ui/button";
import { Customer, Order } from "@/lib/types";
import Link from "next/link";
import { getCustomer } from "../_actions/getCustomer";
import { getOrdersByCustomer } from "../_actions/getOrdersByCustomer";

export default async function Cart() {
  const customer = (await getCustomer()) as Customer;
  const ordersByCustomer = (await getOrdersByCustomer(customer.id)) as Order[];

  if (customer.role !== "ROLE_STAFF") {
    return (
      <div>
        <h3>Your Orders</h3>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="mx-auto my-4 flex w-[80%] flex-col p-2">
            <div className="m-4 flex items-center justify-between gap-4 border border-gray-400 p-2">
              <div className="flex flex-col gap-2">
                {ordersByCustomer
                  .filter((o) => o.orderStatus === "IN_PROGRESS")
                  .map((obc) =>
                    obc.orderItems.map((item) => (
                      <div key={item.id} className="m-2 flex flex-row gap-2 border border-green-200 bg-green-200 p-2">
                        <span>{item.bookId} </span>x
                        <input
                          // FIN
                          // onChange={() => updateQty(POST -> /cart/orders/update/qty)}
                          type="number"
                          value={item.quantity}
                          min={0}
                          max={10}
                        />
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/chekout`}>
              <Button className="bg-gray-400" type="submit">
                Finish Shopping
              </Button>
            </Link>
            <Link href={`/books`}>
              <Button className="bg-accent">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <>Not Authorized</>;
  }
}
