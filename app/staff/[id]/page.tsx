import { getStaffById } from "@/app/_actions/getStaffById";
import { uploadBook } from "@/app/_actions/uploadBook";
import Upload from "./book-upload";

export default async function StaffInfo({ params }: { params: { id: number } }) {
  const staffInfo = await getStaffById(params);

  return (
    <>
      Staff info for: {params.id}
      <h2>{staffInfo.fullName}</h2>
      {/* Opens a modal and adds book inside of it */}
      <Upload uploadBook={uploadBook} />
    </>
  );
}
