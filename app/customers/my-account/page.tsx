import { getBooks } from "@/app/_actions/getBooks";
import { getCustomer } from "@/app/_actions/getCustomer";
import { getGenres } from "@/app/_actions/getGenres";
import { uploadBook } from "@/app/_actions/uploadBook";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { Order, SearchParams } from "@/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";
import AccountTabs from "./account-tabs";

export default async function CustomerDashboard({ searchParams }: { searchParams: SearchParams }) {
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

  const books = await getBooks(searchParams);

  const genres = await getGenres();

  return (
    <div className="flex flex-row gap-4">
      <AccountTabs customer={customer} orders={orders} books={books} uploadBook={uploadBook} genres={genres} />
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
