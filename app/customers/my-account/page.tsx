import { getCustomer } from "@/app/_actions/getCustomer";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { Order } from "@/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function CustomerDashboard() {
  const customer = await getCustomer();

  const getOrders = async () => {
    const token = cookies().get("auth_token")?.value as string;
    const data = await fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = (await data.json()) as Order[];
    return res;
  };

  const orders = await getOrders();

  console.log("Orders: ", orders);

  return (
    <>
      Customer: {customer.id}
      <div>
        <h3>Customer Info</h3>
        <p>Email: {customer.email}</p>
        <div className="flex gap-2 items-center">
          <p>Password: {customer.password}</p> <input type="password" className="w-[10%]" defaultValue={"******"} />
          <Button variant={"secondary"}>Change</Button>
        </div>
        <p>Full Name: {customer.fullName}</p>
        <p>Address: {customer.address}</p>
        <p>Role: {customer.role}</p>
      </div>
      <Link href={`/customers/${customer.id}/staff-orders`}>
        {customer.role === "ROLE_STAFF" ? (
          <Button className="bg-blue-400">Staff Orders</Button>
        ) : (
          <Button className="bg-accent">Orders</Button>
        )}
      </Link>
      {customer.role === "ROLE_STAFF" && (
        <div className="border border-gray-400 w-[80%] mx-auto my-4 p-2">
          <div className="w-full">
            {orders.map((order) => (
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
      )}
    </>
  );
}
