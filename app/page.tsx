import Search from "@/app/_components/search";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="h-full w-full">
      <Image src={"/hero-banner.jpg"} width={1400} height={500} alt="hero-banner" className="opacity-30" />
      <h1 className="absolute left-[20%] top-[35%] text-3xl font-bold text-orange-900 md:left-[30%] md:top-[20%] md:text-5xl">
        Find your favorite book <br /> <span className="text-gray-500">at your fingertips,</span>
        <br /> <span className="text-gray-800 underline">in seconds</span>
      </h1>

      <div className="absolute top-[65%] mt-4 w-full bg-gray-200 md:left-[25%] md:top-[45%] md:w-[50%]">
        <Search where="home" />
      </div>
    </div>
  );
}
