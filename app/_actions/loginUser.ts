import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginUser = async (formData: FormData) => {
  "use server";

  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const data = await fetch(`${BASE_URL}/authentication`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!data.ok) {
      console.log("Error while login");
    }

    const res = await data.json();
    cookies().set("auth_token", res.token, { sameSite: "strict", secure: true, httpOnly: true });
  } catch (error) {
    console.log(error);
  }

  if (cookies().get("auth_token")) {
    redirect("/books");
  } else {
    console.log("Cookie eaten :D");
  }
};
