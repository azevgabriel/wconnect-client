import { ReservationModel } from "./Reservation";

export type TripStatus = "planned" | "in_progress" | "completed" | "canceled";

export interface TripModel {
  id: string;
  startDate: string;
  name: string;
  status: TripStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripModelWithReservations extends TripModel {
  reservations: ReservationModel[];
}

export type AddTripModel = Omit<
  TripModel,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export interface TripsFilters {
  status?: TripStatus;
}
