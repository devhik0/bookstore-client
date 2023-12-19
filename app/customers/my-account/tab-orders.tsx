import { getCustomer } from "@/app/_actions/getCustomer";
import { getOrders } from "@/app/_actions/getOrders";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { Customer, Order } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function TabOrders() {
  const customer = (await getCustomer()) as Customer;
  const orders = (await getOrders()) as Order[];

  const deleteOrder = async (id: number) => {
    "use server";

    const token = cookies().get("auth_token")?.value as string;

    try {
      const data = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.ok) {
        console.log("Error while deleting: ", data.status);
      } else {
        console.log("Deleted order: ", id);
      }
    } catch (error) {
      console.log(error);
    }
    revalidatePath("/customers/my-account");
  };

  return (
    <>
      {customer.role === "ROLE_STAFF" && (
        <div className="mx-auto my-4 w-[80%] border border-gray-400 p-2">
          <div className="w-full">
            {orders.map((order) => (
              <div key={order.id} className="m-2 flex flex-col justify-between gap-2 border border-gray-400 p-2">
                <div className="flex justify-between gap-2 border-b border-b-gray-800">
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
                <div className="flex justify-center gap-4">
                  <form action={deleteOrder.bind(null, order.id)}>
                    <Button variant={"destructive"} type="submit">
                      Reject
                    </Button>
                  </form>
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
