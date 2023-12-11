import { BASE_URL } from "@/lib/constants";

export const signupUser = async (formData: FormData) => {
  "use server";

  try {
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      fullName: formData.get("fullname") as string,
      address: formData.get("address") as string,
    };
    if (!userData) {
      console.log("Please fill form.");
    }

    const data = await fetch(`${BASE_URL}/customers`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!data.ok) {
      console.log("Error while registering.");
    }

    const registeredUser = await data.json();
    console.log("Registered: ", registeredUser);
  } catch (error) {
    console.log(error);
  }
};
