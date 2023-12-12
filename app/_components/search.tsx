"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function Search({ where }: { where?: "home" | "books" }) {
  const [query, setQuery] = useState("");

  return (
    <form className="p-4 flex justify-between items-center">
      <div id={where} className="flex gap-2 w-full items-center">
        <input
          name="query"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for title or author"
          className="p-2 w-full border border-orange-800"
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
