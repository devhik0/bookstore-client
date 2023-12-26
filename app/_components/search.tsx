"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useState } from "react";

export default function Search({ where }: { where?: "home" | "books" }) {
  const [query, setQuery] = useState("");

  const cookies = useCookies();

  return (
    <form className="flex w-[35%] justify-between p-4">
      <div id={where} className="flex w-full items-center gap-2 border border-orange-800 p-2">
        <input
          name="query"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for title or author"
          className="w-full  p-2"
        />
        {query && (
          <Link href={`/books`}>
            <XIcon
              className=""
              size={"1.5rem"}
              onClick={() => {
                setQuery("");
                cookies.remove("query");
              }}
            />
          </Link>
        )}
        <Link href={query !== "" ? `/books?searchString=${query}` : `/books`}>
          <Button
            type="submit"
            onClick={() => cookies.set("query", query, { sameSite: "strict", secure: true })}
            size={"sm"}
            className="bg-accent md:text-[1rem]"
          >
            Search
          </Button>
        </Link>
      </div>
    </form>
  );
}
