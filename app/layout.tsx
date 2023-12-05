import Navbar from "@/app/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "PageFlip",
  description: "A bookstore for your favorite books",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
