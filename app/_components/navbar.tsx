"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogInIcon, UserPlus } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import CartSheet from "./cart-sheet";

export default function Navbar() {
  const cookies = useCookies();

  const isLogged = cookies.get("auth_token") as string;

  // console.log("token in nav: ", isLogged);

  const logout = () => {
    cookies.remove("auth_token");
    cookies.remove("query");
  };

  return (
    <NavigationMenu className="bg-accent flex flex-col md:flex-row">
      <Link href={"/"}>
        <Image src={"/logo.png"} width={64} height={64} alt="logo" />
      </Link>
      <NavigationMenuList className={`m-2 flex flex-row items-center`}>
        {!isLogged && (
          <div className="flex flex-col items-center gap-4 p-2 md:flex-row ">
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                  <LogInIcon className="ml-2" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/signup" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Signup
                  <UserPlus className="ml-2" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>
        )}

        {isLogged && (
          <ul
            className={`flex items-center ${!isLogged ? `mr-4 flex-col pt-2` : `flex-row justify-center px-2`}
        `}
          >
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src="/logo.png"
                      width={36}
                      height={36}
                      alt="user-img"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="text-gray-200">NC</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/customers/my-account`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <Link href={`/`}>Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <CartSheet isLogged={isLogged} />
            </NavigationMenuItem>
          </ul>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
