"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SearchBooks() {
  const [query, setQuery] = useState("");

  return (
    <form className="border-2 border-green-800 p-4 flex gap-4 justify-between items-center">
      <label className="w-full">Search for...</label>
      <div className="flex gap-4 w-full">
        <input
          name="query"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for title or author"
          className="p-2"
        />
        <Link href={query ? `/books?searchString=${query}` : `/books`}>
          <Button type="submit">Search</Button>
        </Link>
      </div>
    </form>
  );
}
