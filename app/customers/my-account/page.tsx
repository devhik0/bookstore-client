import { getCustomer } from "@/app/_actions/getCustomer";
import { Customer } from "@/lib/types";
import AccountTabs from "./account-tabs";
import CustomerData from "./customer-data";
import OrderHistoryCustomer from "./order-history-customer";

export default async function CustomerDashboard() {
  const customer = (await getCustomer()) as Customer;

  return (
    <div className="flex flex-row gap-4">
      {customer.role === "ROLE_STAFF" && <AccountTabs />}
      {customer.role !== "ROLE_STAFF" && <OrderHistoryCustomer />}
      <CustomerData />
    </div>
  );
}
