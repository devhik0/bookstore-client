import Navbar from "@/app/_components/navbar";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
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
    <html lang="en">
      <body className={roboto.className}>
        <CookiesProvider>
          <Navbar />
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}
