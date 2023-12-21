import { approveOrder } from "@/app/_actions/approveOrder";
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
        <div className="mx-auto my-4 w-[80%] p-2">
          <div className="w-full">
            {orders
              .reverse()
              .filter((order) => order.orderStatus === "COMPLETED")
              .map((order) => (
                <div
                  key={order.id}
                  className={
                    order.orderStatus !== "COMPLETED"
                      ? `m-2 flex flex-col justify-between gap-2 border border-gray-300 p-2`
                      : `m-2 flex flex-row items-center gap-2 border border-gray-100 bg-green-100 p-2`
                  }
                >
                  <div
                    className={
                      order.orderStatus !== "COMPLETED"
                        ? `flex justify-between gap-2 border-b border-b-gray-400`
                        : `flex justify-between gap-2 border-none`
                    }
                  >
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
                  {order.orderStatus === "IN_PROGRESS" && (
                    <div className="flex justify-center">
                      <form action={approveOrder.bind(null, order.id)}>
                        <Button type="submit" className=" bg-green-600">
                          Approve
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            {orders
              .reverse()
              .filter((order) => order.orderStatus !== "COMPLETED")
              .map((order) => (
                <div
                  key={order.id}
                  className={
                    order.orderStatus !== "CANCELED"
                      ? `m-2 flex flex-col justify-between gap-2 border border-gray-300 p-2`
                      : `m-2 flex flex-row items-center gap-2 border border-gray-100 bg-red-100 p-2`
                  }
                >
                  <div
                    className={
                      order.orderStatus !== "CANCELED"
                        ? `flex justify-between gap-2 border-b border-b-gray-400`
                        : `flex justify-between gap-2 border-none`
                    }
                  >
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
                  {order.orderStatus !== "CANCELED" && (
                    <div className="flex justify-center">
                      <form action={approveOrder.bind(null, order.id)}>
                        <Button type="submit" className=" bg-green-600">
                          Approve
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
