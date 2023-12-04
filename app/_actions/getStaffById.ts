import { Staff } from "@/lib/types";

export const getStaffById = async (params: { id: number }) => {
  const data = await fetch(`http://localhost:8080/api/staff/${params.id}`);
  const staffInfo = (await data.json()) as Staff;
  return staffInfo;
};
