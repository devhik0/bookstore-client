import SearchHome from "@/components/other/search-home";
import Image from "next/image";

export default async function Home() {
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

        <div className="absolute top-[40%] left-[26%] mt-4 bg-gray-200">
          <SearchHome />
        </div>
        {/* for testing only ! */}
        {/* <Link href={"/staff"} className="absolute top-[50%] left-[40%] mt-4 p-4 text-xl w-[20%] bg-green-800">
          Staff
        </Link> */}
        {/* for testing only ! */}
      </div>
    </div>
  );
}
