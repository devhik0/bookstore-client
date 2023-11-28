// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function Upload({ uploadBook }) {
  const [file, setFile] = useState(null);

  return (
    // ! here is problem cuz of server actions
    <form action={() => uploadBook(file)}>
      {/* fictional book inputs like title */}
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log("File added");
        }}
      />
      <Button type="submit">Upload Book</Button>
    </form>
  );
}
