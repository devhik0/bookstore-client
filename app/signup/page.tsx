import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signupUser } from "../_actions/signupUser";

export default async function Signup() {
  return (
    <form action={signupUser} className="flex flex-col justify-center mx-auto mt-4 bg-gray-200 w-[80%]">
      <h3 className="text-center mt-2">Signup Form</h3>
      <div className="flex flex-col gap-2 justify-center m-4 ">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="" required placeholder="john@mail.com" className="p-2" />
        <label htmlFor="email">Password: </label>
        <input type="password" name="password" id="" required placeholder="min 4 char" className="p-2" />
        <label htmlFor="fullname">Full Name: </label>
        <input type="text" name="fullname" id="" required placeholder="John Doe" className="p-2" />
        <label htmlFor="fullname">Address: </label>
        <textarea name="address" id="" cols={30} rows={2} placeholder="1000. St. X Av. ..." className="p-2" />
        <Button className="mt-2 bg-accent">Signup</Button>
        <span>Do you have account ?</span>
        <Link href={"/login"}>
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    </form>
  );
}
