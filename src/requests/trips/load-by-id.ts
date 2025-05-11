import { TripModelWithReservations } from "@/interfaces/Trip";

export const loadTripById = async (
  id: string,
  token: string
): Promise<TripModelWithReservations> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/trips/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add trip");
  }

  return response.json();
};
