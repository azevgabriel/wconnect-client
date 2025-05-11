import { AddUserModel, AuthenticateUserModel } from "@/interfaces/User";

export const registerUser = async (
  data: AddUserModel
): Promise<AuthenticateUserModel> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
};
