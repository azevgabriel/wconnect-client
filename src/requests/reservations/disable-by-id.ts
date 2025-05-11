import { ReservationModel } from "@/interfaces/Reservation";

export const disableReservationById = async (
  id: string,
  token: string
): Promise<ReservationModel> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/reservations/${id}/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to disable reservation");
  }

  return response.json();
};
