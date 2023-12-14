import { getCustomer } from "@/app/_actions/getCustomer";
import { getOrders } from "@/app/_actions/getOrders";
import { Button } from "@/components/ui/button";
import { Customer, Order } from "@/lib/types";

export default async function TabOrders() {
  const customer = (await getCustomer()) as Customer;
  const orders = (await getOrders()) as Order[];

  return (
    <>
      {customer.role === "ROLE_STAFF" && (
        <div className="mx-auto my-4 w-[80%] border border-gray-400 p-2">
          <div className="w-full">
            {orders.map((order) => (
              <div key={order.id} className="m-2 flex flex-col justify-between gap-2 border border-gray-400 p-2">
                <div className="flex justify-between gap-2 border-b border-b-gray-800">
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
                <div className="flex justify-center gap-4">
                  <Button variant={"destructive"}>Reject</Button>
                  <Button variant={"secondary"}>Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
