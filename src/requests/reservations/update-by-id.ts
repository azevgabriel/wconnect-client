import {
  AddReservationModel,
  ReservationModel,
} from "@/interfaces/Reservation";

export const updateReservationById = async (
  id: string,
  data: Partial<AddReservationModel>,
  token: string
): Promise<ReservationModel> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/reservations/${id}`,
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
    throw new Error("Failed to update reservation");
  }

  return response.json();
};
