import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BASE_URL } from "@/lib/constants";
import { Customer, Order } from "@/lib/types";

export default async function Admin() {
  const admin = true;

  const data = await fetch(`${BASE_URL}/orders`);
  const orders = (await data.json()) as Order[];

  const dataC = await fetch(`${BASE_URL}/customers`);
  const customers = (await dataC.json()) as Customer[];

  return (
    <div>
      <h3>Admin Panel</h3>
      {admin ? (
        <div className="flex justify-center">
          <Tabs defaultValue="orders" className="w-[90%] p-4">
            <TabsList className="w-full bg-orange-200 gap-4">
              <TabsTrigger value="orders" className="bg-orange-400 p-2">
                Orders
              </TabsTrigger>
              <TabsTrigger value="customers" className="bg-orange-400 p-2">
                Customers
              </TabsTrigger>
              <TabsTrigger value="staff" className="bg-orange-400 p-2">
                Staff
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <h4 className="text-lg ml-4">Orders</h4>
              <div className="w-full">
                {orders.map((order) => (
                  <div key={order.id} className="flex gap-2 flex-col border border-gray-400 m-2 p-2 justify-between">
                    <div className="flex gap-2 justify-between border-b border-b-gray-800">
                      <div>{order.id}</div>
                      <div>{order.customerId}</div>
                      <div>
                        {order.createdAt[0]}/{order.createdAt[1]}/{order.createdAt[2]}
                      </div>
                      <div>{order.orderStatus}</div>
                    </div>
                    <h3>Order Items</h3>
                    {order.orderItems.map((item) => (
                      <div key={item.id}>
                        <span>
                          {item.id} x {item.quantity}
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
            </TabsContent>
            <TabsContent value="customers">
              <div className="m-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex gap-2 border border-gray-200 p-4 m-2">
                    <span>{customer.fullName}</span>
                    <span>{customer.address}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="staff">Staff info.</TabsContent>
          </Tabs>
        </div>
      ) : (
        <>Not Authorized </>
      )}
    </div>
  );
}
