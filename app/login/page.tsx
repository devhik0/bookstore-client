import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginUser } from "../_actions/loginUser";

export default async function Login() {
  return (
    <form action={loginUser} className="flex flex-col justify-center mx-auto mt-4 bg-gray-200 w-[80%]">
      <h3 className="text-center mt-2">Login Form</h3>
      <div className="flex flex-col gap-2 justify-center m-4 ">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="" required placeholder="john@mail.com" className="p-2" />
        <label htmlFor="email">Password: </label>
        <input type="password" name="password" id="" required placeholder="min 4 char" className="p-2" />
        <Button className="mt-2 bg-accent">Login</Button>
        <span>Do not you have account ?</span>
        <Link href={"/signup"}>
          <Button className="w-full">Signup</Button>
        </Link>
      </div>
    </form>
  );
}
