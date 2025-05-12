import { TripModel, TripsFilters } from "@/interfaces/Trip";

export const loadTrips = async (
  query: {
    page: number;
    limit: number;
    filters?: TripsFilters;
  },
  token: string
): Promise<{
  data: TripModel[];
  page: number;
  limit: number;
  count: {
    total: number;
  };
}> => {
  if (!process?.env?.NEXT_PUBLIC_API_URL)
    throw new Error("API URL is not defined");

  const queryString = new URLSearchParams({
    page: query.page.toString(),
    limit: query.limit.toString(),
  }).toString();

  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_API_URL}/trips?${queryString}R`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load trips");
  }

  return response.json();
};
