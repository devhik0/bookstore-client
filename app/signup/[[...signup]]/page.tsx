import { SignUp } from "@clerk/nextjs";

export default async function Signup() {
  return (
    <div className="flex justify-center m-4">
      <SignUp />
    </div>
  );
}
