import Search from "@/app/_components/search";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="w-full h-full">
      <Image src={"/hero-banner.jpg"} width={1400} height={500} alt="hero-banner" className="opacity-30" />
      <h1 className="text-5xl font-bold text-orange-900 absolute top-[15%] left-[30%]">
        Find your favorite book <br /> <span className="text-gray-400">at your fingertips,</span>
        <br /> <span className="text-gray-800 underline">in seconds</span>
      </h1>

      <div className="absolute top-[40%] left-[26%] mt-4 bg-gray-200">
        <Search where="home" />
      </div>
    </div>
  );
}
