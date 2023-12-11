import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, XIcon } from "lucide-react";
import Link from "next/link";

export default function CartSheet({ isLogged }: { isLogged: string }) {
  return (
    <Sheet>
      <SheetTrigger className="pt-2">
        <ShoppingCart color="white" className="m-4" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          {isLogged ? (
            <SheetDescription>
              <div className="h-[80vh]">
                <div className="h-full overflow-y-scroll">
                  <div className=" flex gap-4 items-center justify-between">
                    <div className="flex flex-col w-full">
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
                          className="border-b border-b-gray-200 w-full flex flex-row gap-2 my-1 items-center p-2 justify-between hover:bg-orange-200"
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
            </SheetDescription>
          ) : (
            <>You need to login to see your cart.</>
          )}
        </SheetHeader>
        <Link href={`/cart`}>
          <Button className="w-[90%] absolute bottom-2 right-4 bg-accent">Order Now</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
