"use client";

import { Button } from "@/components/ui/button";
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
    <div>
      <NavigationMenu className="bg-accent flex flex-col md:flex-row">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={64} height={64} alt="logo" />
        </Link>
        <NavigationMenuList className="flex flex-row gap-4 justify-between items-center px-2">
          {!isLogged ? (
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                  <LoginIcon className="ml-2" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <Button
              onClick={() => {
                cookies.remove("auth_token");
                router.push("/");
              }}
            >
              Logout
            </Button>
          )}

          {!isLogged && (
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
            {/* user dropdown */}
            User Dropdown
          </NavigationMenuItem>

          <NavigationMenuItem>
            <CartSheet isLogged={isLogged} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
