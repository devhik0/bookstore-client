import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signupUser } from "../_actions/signupUser";

export default async function Signup() {
  return (
    <form action={signupUser} className="mx-auto mt-4 flex w-[80%] flex-col justify-center bg-gray-200">
      <h3 className="mt-2 text-center">Signup Form</h3>
      <div className="m-4 flex flex-col justify-center gap-2 ">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="" required placeholder="john@mail.com" className="p-2" />
        <label htmlFor="email">Password: </label>
        <input type="password" name="password" id="" required placeholder="min 4 char" className="p-2" />
        <label htmlFor="fullname">Full Name: </label>
        <input type="text" name="fullname" id="" required placeholder="John Doe" className="p-2" />
        <label htmlFor="fullname">Address: </label>
        <textarea name="address" id="" cols={30} rows={2} placeholder="1000. St. X Av. ..." className="p-2" />
        <Button className="bg-accent mt-2">Signup</Button>
        <span>Do you have account ?</span>
        <Link href={"/login"}>
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    </form>
  );
}
