import { getCustomer } from "@/app/_actions/getCustomer";
import { getOrdersByCustomer } from "@/app/_actions/getOrdersByCustomer";
import { Button } from "@/components/ui/button";
import { Customer, Order } from "@/lib/types";

export default async function OrderHistoryCustomer() {
  const customer = (await getCustomer()) as Customer;
  const ordersByCustomer = (await getOrdersByCustomer(customer.id)) as Order[];

  // console.log("Orders by customer: ", ordersByCustomer);

  return (
    <div className="w-full">
      <h3 className="font-bold text-xl ml-2">Order history</h3>
      <div className="w-full">
        {ordersByCustomer.map((order) => (
          <div key={order.id} className="flex gap-2 flex-col border border-gray-400 m-2 p-2 justify-between">
            <div className="flex gap-2 justify-between border-b border-b-gray-800">
              <div>{order.id}</div>
              <div>{order.customerId}</div>
              <div>
                <span>{order.createdAt.toString().slice(0, 9)}</span>{" "}
                <span>{order.createdAt.toString().slice(11, 19)}</span>
              </div>
              <div>{order.orderStatus}</div>
            </div>
            <h3>Order Items</h3>
            {order.orderItems.map((item) => (
              <div key={item.id}>
                <span>
                  {item.bookId} x {item.quantity}
                </span>
              </div>
            ))}
            <div className="flex gap-4 justify-center">
              <Button variant={"destructive"}>Reject</Button>
              <Button variant={"secondary"}>Approve</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
