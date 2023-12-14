"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Search({ where }: { where?: "home" | "books" }) {
  const [query, setQuery] = useState("");

  return (
    <form className="flex items-center justify-between p-4">
      <div id={where} className="flex w-full items-center gap-2">
        <input
          name="query"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for title or author"
          className="w-full border border-orange-800 p-2"
        />
        <Link href={query ? `/books?searchString=${query}` : `/books`}>
          <Button type="submit" className="bg-accent text-xs md:text-[1rem]">
            Search
          </Button>
        </Link>
      </div>
    </form>
  );
}
