import {
  AuthenticateUserModel,
  AuthenticateUserRequest,
} from "@/interfaces/User";

export const authUser = async (
  data: AuthenticateUserRequest
): Promise<AuthenticateUserModel> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/users/auth`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to authenticate user");
  }

  return response.json();
};
