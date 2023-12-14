import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginUser } from "../_actions/loginUser";

export default async function Login() {
  return (
    <form action={loginUser} className="mx-auto mt-4 flex w-[80%] flex-col justify-center bg-gray-200">
      <h3 className="mt-2 text-center">Login Form</h3>
      <div className="m-4 flex flex-col justify-center gap-2 ">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="" required placeholder="john@mail.com" className="p-2" />
        <label htmlFor="email">Password: </label>
        <input type="password" name="password" id="" required placeholder="min 4 char" className="p-2" />
        <Button className="bg-accent mt-2">Login</Button>
        <span>Do not you have account ?</span>
        <Link href={"/signup"}>
          <Button className="w-full">Signup</Button>
        </Link>
      </div>
    </form>
  );
}
