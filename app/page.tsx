import Search from "@/app/_components/search";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="w-full h-full">
      <Image src={"/hero-banner.jpg"} width={1400} height={500} alt="hero-banner" className="opacity-30" />
      <h1 className="text-3xl md:text-5xl font-bold text-orange-900 absolute top-[35%] md:top-[20%] left-[20%] md:left-[30%]">
        Find your favorite book <br /> <span className="text-gray-500">at your fingertips,</span>
        <br /> <span className="text-gray-800 underline">in seconds</span>
      </h1>

      <div className="absolute top-[65%] w-full md:w-[50%] md:top-[55%] md:left-[25%] mt-4 bg-gray-200">
        <Search where="home" />
      </div>
    </div>
  );
}
