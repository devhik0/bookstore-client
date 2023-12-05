"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <div className="bg-orange-800 flex justify-between py-1 px-2 items-center">
      <NavigationMenu>
        <Link href={"/"}>
          <Image src={"/logo.png"} width={64} height={64} alt="logo" />
        </Link>
        <NavigationMenuList>
          <div className="flex gap-4">
            {!userId && (
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Login</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            {!userId && (
              <NavigationMenuItem>
                <Link href="/signup" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Signup</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <UserButton afterSignOutUrl="/" />
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
