import { getBooks } from "@/app/_actions/getBooks";
import { getCustomer } from "@/app/_actions/getCustomer";
import { getCustomers } from "@/app/_actions/getCustomers";
import { getGenres } from "@/app/_actions/getGenres";
import { getOrders } from "@/app/_actions/getOrders";
import { getOrdersByCustomer } from "@/app/_actions/getOrdersByCustomer";
import { uploadBook } from "@/app/_actions/uploadBook";
import { Button } from "@/components/ui/button";
import { Genre, Order, SearchParams } from "@/lib/types";
import Link from "next/link";
import AccountTabs from "./account-tabs";

export default async function CustomerDashboard({ searchParams }: { searchParams: SearchParams }) {
  const customer = await getCustomer();

  const orders = await getOrders();

  const books = await getBooks(searchParams);

  const genres = (await getGenres()) as Genre[];

  const customers = await getCustomers();

  const ordersByCustomer = (await getOrdersByCustomer(customer.id)) as Order[];

  console.log("Orders by customer: ", ordersByCustomer);

  return (
    <div className="flex flex-row gap-4">
      {customer.role === "ROLE_STAFF" && (
        <AccountTabs
          customer={customer}
          orders={orders}
          books={books}
          uploadBook={uploadBook}
          genres={genres}
          customers={customers}
        />
      )}
      {customer.role !== "ROLE_STAFF" && (
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
      )}
      <div className=" m-2 p-4 bg-blue-50 h-[30%]">
        <div className="flex justify-end">
          {customer.role === "ROLE_STAFF" ? (
            <span className="bg-blue-200 text-xs px-4 py-1 rounded-lg">Staff</span>
          ) : (
            <></>
          )}
        </div>
        <p className="mt-2">Email: {customer.email}</p>
        <div className="flex gap-2 items-center">
          <p>Password: {customer.password}</p> <input type="password" className="w-[20%]" defaultValue={"******"} />
          <Button variant={"destructive"}>Change</Button>
        </div>
        <p>Full Name: {customer.fullName}</p>
        <p>Address: {customer.address}</p>
        <Link href={`/customers/${customer.id}/staff-orders`}>
          {customer.role === "ROLE_STAFF" ? (
            <Button className="bg-blue-400">Staff Orders</Button>
          ) : (
            <Button className="bg-accent">Orders</Button>
          )}
        </Link>
      </div>
    </div>
  );
}
