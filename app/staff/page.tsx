import Link from "next/link";

const Staff = async () => {
  const data = await fetch("http://localhost:8080/api/staff");
  const staff = await data.json();

  // console.log(staff)

  return (
    <>
      Staff page <br /> <button className="bg-blue-400">Add staff</button>
      <div>
        {staff.map((staff) => (
          <div key={staff.id} className="border border-orange-400 m-4 p-4">
            {staff.fullName}
          </div>
        ))}
      </div>
      <Link href={"/"} className="bg-green-400">
        Back to books
      </Link>
    </>
  );
};

export default Staff;
