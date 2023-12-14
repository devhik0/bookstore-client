"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn as LoginIcon, UserPlus } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import CartSheet from "./cart-sheet";

export default function Navbar() {
  const cookies = useCookies();
  const isLogged = cookies.get("auth_token") as string;

  const router = useRouter();

  return (
    <NavigationMenu className="bg-accent flex flex-col md:flex-row">
      <Link href={"/"}>
        <Image src={"/logo.png"} width={64} height={64} alt="logo" />
      </Link>
      <NavigationMenuList className={`flex flex-row items-center m-2`}>
        {!isLogged && (
          <div className="flex flex-col gap-4 items-center p-2 md:flex-row ">
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                  <LoginIcon className="ml-2" />
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
          <div
            className={`flex items-center ${!isLogged ? `flex-col mr-4 pt-2` : `flex-row justify-center px-2`}
            `}
          >
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/customers/my-account`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      cookies.remove("auth_token");
                      router.push("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <CartSheet isLogged={isLogged} />
            </NavigationMenuItem>
          </div>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
