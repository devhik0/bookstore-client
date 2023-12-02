import { Staff } from "@/lib/types";
import Link from "next/link";

const Staff = async () => {
  const data = await fetch("http://localhost:8080/api/staff");
  const staff = (await data.json()) as Staff[];

  // console.log(staff);

  return (
    <>
      Staff page <br /> <button className="bg-blue-400">Add staff</button>
      <div className="m-6">
        {staff.map((staff) => (
          <Link href={`staff/${staff.id}`} key={staff.id} className="border border-orange-400 m-4 p-4">
            {staff.fullName}
          </Link>
        ))}
      </div>
      <Link href={"/"} className="bg-green-400">
        Back to books
      </Link>
    </>
  );
};

export default Staff;
