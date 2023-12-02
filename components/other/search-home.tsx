"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SearchHome() {
  const [query, setQuery] = useState("");

  return (
    <form className="p-4 flex gap-4 justify-between items-center w-[50vw]">
      <div className="flex gap-4 w-full items-center">
        <input
          name="query"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for title or author"
          className="p-2 w-full"
        />
        <Link href={query ? `/books?searchString=${query}` : `/books`}>
          <Button type="submit" className="bg-orange-800">
            Search
          </Button>
        </Link>
      </div>
    </form>
  );
}
