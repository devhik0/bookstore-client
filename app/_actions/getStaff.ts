import { BASE_URL } from "@/lib/constants";
import { Staff } from "@/lib/types";

export const getStaff = async () => {
  const data = await fetch(`${BASE_URL}/staff`);
  const staff = (await data.json()) as Staff[];
  return staff;
};
