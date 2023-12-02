"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function Upload({ uploadBook }: { uploadBook: (formData: FormData) => Promise<void> }) {
  const [, setFile] = useState<File | null>(null);

  return (
    <form action={uploadBook} className="bg-gray-200 w-[30%] flex gap-4 items-center p-4">
      {/* add fictional book inputs like title */}
      <div className="flex flex-col gap-2 w-full">
        <label>
          Book Title: <input type="text" name="title" required />
        </label>
        <label>
          Book Description: <textarea name="desc" required />
        </label>
        <label>
          Book Price: <input type="text" name="price" required /> €
        </label>

        <input
          name="file"
          type="file"
          onChange={(e) => {
            const image = e.currentTarget.files![0];
            setFile(image);
            // console.log("Image added: ", image);
          }}
        />
        <Button type="submit" className="bg-orange-800">
          Upload Book
        </Button>
      </div>
    </form>
  );
}
