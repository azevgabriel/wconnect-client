import {
  AddReservationModel,
  ReservationModel,
} from "@/interfaces/Reservation";

export const addReservation = async (
  data: AddReservationModel,
  token: string
): Promise<ReservationModel> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/reservations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add reservation");
  }

  return response.json();
};
