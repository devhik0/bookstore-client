import { Staff } from "@/lib/types";

export const getStaff = async () => {
  const data = await fetch("http://localhost:8080/api/staff");
  const staff = (await data.json()) as Staff[];
  return staff;
};
