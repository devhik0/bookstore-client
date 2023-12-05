import { BASE_URL } from "@/lib/constants";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default async function Cart() {
  const { userId } = auth();

  const data = await fetch(`${BASE_URL}/orders/152`);
  const orders = await data.json();
  console.log("Orders: ", orders);

  const user = (await currentUser()) as User;
  return (
    <div>
      Cart for {userId} <br />
      User info:
      <span>{user.emailAddresses.map((e) => e.emailAddress)}</span>
      <h3>Your Orders for CustomerID: 152</h3>
      <div>
        {userId ? (
          <div className="border border-gray-400 w-[80%] mx-auto my-4 p-2">
            {orders.map((order) => (
              <div className="border border-gray-400 m-4 p-2 flex gap-4 items-center justify-between">
                <div className="flex gap-2">
                  {order.orderItems.map((item) => (
                    <div className="flex flex-row gap-2 bg-green-200 border border-green-200 m-2 p-2">
                      <span>{item.bookId} </span>x<span>{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <span className="bg-orange-400 p-2">{order.orderStatus}</span>
              </div>
            ))}
          </div>
        ) : (
          <>You need to login to see your orders</>
        )}
      </div>
    </div>
  );
}
