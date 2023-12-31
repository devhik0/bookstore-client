import { getCustomers } from "@/app/_actions/getCustomers";
import { Customer } from "@/lib/types";
import DeleteCustomerDialog from "./delete-customer-dialog";

export default async function TabCustomers() {
  const customers = (await getCustomers()) as Customer[];

  return (
    <>
      {customers
        .filter((customer) => customer.fullName !== "anon")
        .reverse()
        .map((customer) => (
          <div
            key={customer.id}
            className="m-2 flex flex-row items-center justify-between gap-2 rounded-lg border border-gray-400 p-4"
          >
            <div className="flex w-full flex-row justify-between gap-2">
              <p>{customer.id}</p>
              <p>{customer.fullName}</p>
              <p>{customer.email}</p>
              <p>{customer.password || "******"}</p>
              <p className="mb-2">{customer.address}</p>
              {customer.role === "ROLE_STAFF" ? <span className="bg-blue-200 p-2">Staff</span> : <p>User</p>}
              <div className="flex justify-self-end">
                <DeleteCustomerDialog customer={customer} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
