import { getCustomer } from "@/app/_actions/getCustomer";
import { getGenres } from "@/app/_actions/getGenres";
import { Customer, Genre } from "@/lib/types";
import AccountTabs from "./account-tabs";
import CustomerData from "./customer-data";
import OrderHistoryCustomer from "./order-history-customer";

export default async function CustomerDashboard() {
  const customer = (await getCustomer()) as Customer;
  const genres = (await getGenres()) as Genre[];

  return (
    <div className="flex flex-row gap-4">
      {customer.role === "ROLE_STAFF" && <AccountTabs genres={genres} />}
      {customer.role !== "ROLE_STAFF" && <OrderHistoryCustomer />}
      <CustomerData />
    </div>
  );
}
