import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full h-full">
      <div className="">
        <Image src={"/hero-banner.jpg"} width={1400} height={500} alt="hero-banner" className="opacity-100" />
        <div className="absolute top-[12%] left-[20%]">
          <h1 className="text-5xl font-bold text-orange-900">
            Find your favorite book at your fingertips,
            <br /> <span className="text-gray-100 underline">in seconds</span>
          </h1>
        </div>
        <Link href={"/books"}>
          <Button className="absolute top-[40%] left-[40%] mt-4 p-4 text-xl w-[20%] bg-orange-800">Search now</Button>
        </Link>
      </div>
    </div>
  );
}
