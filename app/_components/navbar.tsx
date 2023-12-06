"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { LogIn as LoginIcon, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import CartSheet from "./cart-sheet";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <div>
      <NavigationMenu className="bg-accent flex flex-col md:flex-row">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={64} height={64} alt="logo" />
        </Link>
        <NavigationMenuList className="flex flex-row gap-4 justify-between items-center px-2">
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
            <CartSheet />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
