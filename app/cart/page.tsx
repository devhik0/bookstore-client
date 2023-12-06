import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { Order } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Cart() {
  const { userId } = auth();

  const data = await fetch(`${BASE_URL}/orders/202`);
  const orders = (await data.json()) as Order[];

  const sendOrder = async () => {
    "use server";
    const orderData = JSON.stringify({
      customerId: 202,
      orderItems: [
        {
          bookId: 554,
          quantity: 3,
        },
        {
          bookId: 703,
          quantity: 1,
        },
      ],
    });
    try {
      const data = await fetch(`${BASE_URL}/orders/202`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: orderData,
      });
      if (!data.ok) {
        console.log("Error while adding order", data.status);
      } else {
        const order = await data.json();
        console.log("Order: ", order);
      }
    } catch (error) {
      console.log("Error at add: ", error);
    }
  };

  return (
    <div>
      <h3>Your Order for CustomerID: 202</h3>
      <div className="flex flex-col gap-2 items-center justify-center">
        {userId ? (
          <div className="border border-gray-400 w-[80%] mx-auto my-4 p-2">
            <div key={orders[0].id} className="border border-gray-400 m-4 p-2 flex gap-4 items-center justify-between">
              <div className="flex gap-2">
                {orders[0].orderItems.map((item) => (
                  <div key={item.id} className="flex flex-row gap-2 bg-green-200 border border-green-200 m-2 p-2">
                    <span>{item.bookId} </span>x<span>{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>You need to login to see your orders</>
        )}
        <div className="flex gap-2">
          <form action={sendOrder}>
            <Button className="bg-gray-400" type="submit">
              Finish Shopping
            </Button>
          </form>
          <Link href={`/books`}>
            <Button className="bg-accent">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
