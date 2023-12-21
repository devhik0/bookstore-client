import { deleteOrder } from "@/app/_actions/deleteOrder";
import { getCustomer } from "@/app/_actions/getCustomer";
import { getOrdersByCustomer } from "@/app/_actions/getOrdersByCustomer";
import { Button } from "@/components/ui/button";
import { Customer, Order } from "@/lib/types";
import { ChevronDown } from "lucide-react";

export default async function OrderHistoryCustomer() {
  const customer = (await getCustomer()) as Customer;
  const ordersByCustomer = (await getOrdersByCustomer(customer.id)) as Order[];

  console.log(
    "Orders by customer: ",
    ordersByCustomer.filter((order) => order.orderStatus === "IN_PROGRESS")
  );

  return (
    <div className="w-full">
      <h3 className="ml-2 text-xl font-bold">Order history</h3>
      <div className="ml-2 flex flex-col gap-2">
        <div className="ml-2 mt-2 flex flex-row items-center gap-2">
          <h3>Canceled</h3>
          <ChevronDown size={"1rem"} />
        </div>
        {ordersByCustomer
          .filter((obc) => obc.orderStatus === "CANCELED")
          .map((order) => {
            return (
              <div key={order.id} className="m-2 flex justify-between gap-2 border border-gray-100 bg-red-100 p-2">
                <div className="flex justify-between gap-2">
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
                {order.orderStatus !== "CANCELED" && (
                  <div className="flex justify-center gap-4 bg-gray-200">
                    <form action={deleteOrder.bind(null, order.id)}>
                      <Button variant={"destructive"} type="submit">
                        Reject
                      </Button>
                    </form>
                    <Button>Approve</Button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="ml-4">
        <div className="mt-2 flex flex-row items-center gap-2">
          <h3>Completed</h3>
          <ChevronDown size={"1rem"} />
        </div>
        <div className="w-full">
          {ordersByCustomer
            .filter((obc) => obc.orderStatus === "COMPLETED")
            .map((order) => {
              return (
                <div
                  key={order.id}
                  className=" my-2 mr-2 flex flex-row justify-between gap-2 border border-gray-100 bg-green-200 p-2"
                >
                  <div className="flex justify-between gap-2 ">
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
                </div>
              );
            })}
        </div>
      </div>
      <div className="ml-4">
        <div className="mt-2 flex flex-row items-center gap-2">
          <h3>In Progress</h3>
          <ChevronDown size={"1rem"} />
        </div>
        <div className="w-full">
          {ordersByCustomer
            .filter((order) => order.orderStatus === "IN_PROGRESS")
            .map((order) => {
              return (
                <div key={order.id} className="my-2 flex flex-col justify-between gap-2 border border-gray-400 p-2">
                  <div className="flex justify-between gap-2 border-b border-b-gray-800">
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
                  {order.orderStatus === "IN_PROGRESS" && (
                    <div className="flex justify-center gap-4">
                      <form action={deleteOrder.bind(null, order.id)}>
                        <Button variant={"destructive"} type="submit">
                          Reject
                        </Button>
                      </form>
                      <Button>Approve</Button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
