import { BASE_URL } from "@/lib/constants";
import { Staff } from "@/lib/types";

export const getStaffById = async (params: { id: number }) => {
  const data = await fetch(`${BASE_URL}/staff/${params.id}`);
  const staffInfo = (await data.json()) as Staff;
  return staffInfo;
};
