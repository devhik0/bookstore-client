import { getCustomer } from "@/app/_actions/getCustomer";
import { getOrdersByCustomer } from "@/app/_actions/getOrdersByCustomer";
import { Customer, Order } from "@/lib/types";

export default async function OrderHistoryCustomer() {
  const customer = (await getCustomer()) as Customer;
  const ordersByCustomer = (await getOrdersByCustomer(customer.id)) as Order[];

  // console.log("Orders by customer: ", ordersByCustomer);

  return (
    <div className="w-full">
      <h3 className="ml-2 text-xl font-bold">Order history</h3>
      <div className="w-full">
        {!ordersByCustomer ? (
          <>You dont have any order yet</>
        ) : (
          ordersByCustomer.map((order) => (
            <div key={order.id} className="m-2 flex flex-col justify-between gap-2 border border-gray-400 p-2">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
