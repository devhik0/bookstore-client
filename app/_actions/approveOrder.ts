import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const approveOrder = async (id: number) => {
  "use server";

  const token = cookies().get("auth_token")?.value as string;

  try {
    const data = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.ok) {
      console.log("Error while marking: ", data.status);
    } else {
      console.log("Completed order: ", id);
    }
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/customers/my-account");
};
