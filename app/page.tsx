import Image from "next/image";
import Link from "next/link";

// TODO: Add searchbar here

export default async function Home() {
  // const query = {
  //   title: "sdfg",
  // };

  // const search = async () => {
  //   "use server";
  //   const formData = new FormData();
  //   const data = formData.get("query");
  //   console.log("Book: ", data);
  // };

  return (
    <div className="w-full h-full">
      <div className="">
        <Image src={"/hero-banner.jpg"} width={1400} height={500} alt="hero-banner" className="opacity-40" />
        <div className="absolute top-[12%] left-[20%]">
          <h1 className="text-5xl font-bold text-orange-900">
            Find your favorite book at your fingertips,
            <br /> <span className="text-gray-800 underline">in seconds</span>
          </h1>
        </div>

        <div className="absolute top-[30%] left-[33%] mt-4 bg-orange-800">
          {/* <form action={search} className="border-2 border-green-800 p-4 flex gap-4 justify-between items-center">
            <label className="w-full">Search for...</label>
            <div className="flex gap-4 w-full">
              <input name="query" type="search" placeholder="Search for title or author" className="p-2" />
              <Link href={`/books?title=${query.title}`}>
                <Button type="submit">Search</Button>
              </Link>
            </div>
          </form> */}
        </div>
        {/* for testing only ! */}
        <Link href={"/staff"} className="absolute top-[50%] left-[40%] mt-4 p-4 text-xl w-[20%] bg-green-800">
          Staff
        </Link>
        {/* for testing only ! */}
      </div>
    </div>
  );
}
