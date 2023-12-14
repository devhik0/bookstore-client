"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export const getRecommendations = async () => {
  const token = cookies().get("auth_token")?.value as string;

  try {
    const data = await fetch(`${BASE_URL}/recommendations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const recomm = await data.json();
    if (!data.ok) {
      console.log("Error while getting recommendations: ", data.status);
    } else {
      console.log("Recomm: ", recomm);
      return recomm;
    }
  } catch (error) {
    console.log(error);
  }
};
