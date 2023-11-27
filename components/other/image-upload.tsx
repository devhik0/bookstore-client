// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-nocheck
// "use client";

// import { useState, useTransition } from "react";
// import { Button } from "../ui/button";

// export default function Upload({ upload }) {
//   const [file, setFile] = useState(null);

//   const [, startTransition] = useTransition();

//   const handleUpload = () => {
//     startTransition(() => upload(file));
//   };
//   return (
//     <form>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <Button onClick={handleUpload}>Upload</Button>
//     </form>
//   );
// }
