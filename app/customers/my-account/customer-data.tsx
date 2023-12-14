import { getCustomer } from "@/app/_actions/getCustomer";
import { Button } from "@/components/ui/button";
import { Customer } from "@/lib/types";
import Link from "next/link";

export default async function CustomerData() {
  const customer = (await getCustomer()) as Customer;

  return (
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
        <Button variant={"destructive"} size={"sm"}>
          Change
        </Button>
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
  );
}
