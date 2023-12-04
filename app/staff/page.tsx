import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStaff } from "../_actions/getStaff";

export default async function Staff() {
  const staff = await getStaff();

  return (
    <>
      Staff page <br /> <Button className="bg-blue-600">Add staff</Button>
      <div className="m-6">
        {staff.map((staff) => (
          <Link href={`staff/${staff.id}`} key={staff.id} className="border border-orange-400 m-4 p-4">
            {staff.fullName}
          </Link>
        ))}
      </div>
      <Link href={"/"} className="bg-green-400">
        <Button>Back to books</Button>
      </Link>
    </>
  );
}
