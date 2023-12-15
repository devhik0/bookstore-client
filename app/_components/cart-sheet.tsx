import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, XIcon } from "lucide-react";
import Link from "next/link";

export default function CartSheet({ isLogged }: { isLogged: string }) {
  // console.log("token in cart: ", isLogged);
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart color="white" className="m-4" size={"2rem"} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          {isLogged ? (
            <div className="h-[80vh]">
              <div className="h-full overflow-y-scroll">
                <div className=" flex items-center justify-between gap-4">
                  <div className="flex w-full flex-col">
                    {[
                      { name: "Horizon Zero Dawn", qty: 5 },
                      { name: "Hunger Games", qty: 1 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                      { name: "Origin", qty: 3 },
                    ].map((item, ix) => (
                      <div
                        key={ix}
                        className="my-1 flex w-full flex-row items-center justify-between gap-2 border-b border-b-gray-200 p-2 hover:bg-orange-200"
                      >
                        <span className="m-2">
                          {item.name} x {item.qty}
                        </span>
                        <XIcon color="#f87171" className="mr-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>You need to login to see your cart.</>
          )}
        </SheetHeader>
        <Link href={`/cart`}>
          <Button className="bg-accent absolute bottom-2 right-4 w-[90%]">Order Now</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
