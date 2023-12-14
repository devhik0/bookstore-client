import { getCustomers } from "@/app/_actions/getCustomers";
import { Customer } from "@/lib/types";
import DeleteCustomerDialog from "./delete-customer-dialog";

export default async function TabCustomers() {
  const customers = (await getCustomers()) as Customer[];

  return (
    <>
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="border border-gray-400 rounded-lg p-4 m-2 flex flex-row gap-2 justify-between items-center"
        >
          <div className="flex flex-row gap-2 w-full">
            <p>{customer.fullName}</p>
            <p>{customer.email}</p>
            <p>{customer.password || "******"}</p>
            <p className="mb-2">{customer.address}</p>
            {customer.role === "ROLE_STAFF" ? <span className="bg-blue-200 p-2">Staff</span> : <p>User</p>}
          </div>
          <DeleteCustomerDialog customer={customer} />
        </div>
      ))}
    </>
  );
}
