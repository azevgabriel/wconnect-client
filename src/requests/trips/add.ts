import { AddTripModel, TripModel } from "@/interfaces/Trip";

export const addTrip = async (
  data: AddTripModel,
  token: string
): Promise<TripModel> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(`${process?.env?.NEXT_PUBLIC_API_URL}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add trip");
  }

  return response.json();
};
