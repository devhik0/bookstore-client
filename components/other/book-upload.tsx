"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function Upload({ uploadBook }: { uploadBook: (formData: FormData) => Promise<void> }) {
  const [, setFile] = useState<File | null>(null);

  return (
    <form action={uploadBook}>
      {/* add fictional book inputs like title */}
      <input type="text" name="title" />
      <input
        name="file"
        type="file"
        onChange={(e) => {
          const image = e.currentTarget.files![0];
          setFile(image);
          // console.log("Image added: ", image);
        }}
      />
      <Button type="submit">Upload Book</Button>
    </form>
  );
}
