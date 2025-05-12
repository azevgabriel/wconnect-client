import { AddTripModel, TripModelWithReservations } from "@/interfaces/Trip";

export const updateTripById = async (
  id: string,
  data: Partial<AddTripModel>,
  token: string
): Promise<TripModelWithReservations> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/trips/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add trip");
  }

  return response.json();
};
