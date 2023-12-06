"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogIn as LoginIcon, ShoppingCart, UserPlus, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <div className="bg-accent flex justify-between py-1 px-2 items-center">
      <NavigationMenu>
        <Link href={"/"}>
          <Image src={"/logo.png"} width={64} height={64} alt="logo" />
        </Link>
        <NavigationMenuList>
          <div className="flex gap-4 items-center mr-4">
            {!userId && (
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                    <LoginIcon className="ml-2" />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {!userId && (
              <NavigationMenuItem>
                <Link href="/signup" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Signup
                    <UserPlus className="ml-2" />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <UserButton afterSignOutUrl="/" />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger>
                  <ShoppingCart color="white" className="m-4" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                    <SheetDescription>
                      {userId ? (
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
                      ) : (
                        <>You need to login to see your orders</>
                      )}
                    </SheetDescription>
                  </SheetHeader>
                  <Link href={`/cart`}>
                    <Button className="w-[90%] absolute bottom-2 right-4 bg-accent">Order Now</Button>
                  </Link>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
