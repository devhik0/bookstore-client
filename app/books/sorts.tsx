"use client";

import { useState } from "react";

export default function Sorts() {
  const [selected, setSelected] = useState("alphabetical");

  return (
    <div className="flex items-center gap-2">
      <span>Sort by</span>
      <select className="p-2" value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value={"alphabetical"}>Alphabetical</option>
        <option value={"price-low"}>Price low</option>
        <option value={"new-old"}>New to old</option>
      </select>
    </div>
  );
}
