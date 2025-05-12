import { ReservationModel } from "@/interfaces/Reservation";

export const AllReservationTypes: ReservationModel["type"][] = [
  "flight",
  "hotel",
  "car",
  "activity",
];

export const ReservationTypePreparation: Record<
  ReservationModel["type"],
  {
    label: string;
    color: "red" | "blue" | "green" | "yellow" | "purple";
  }
> = {
  flight: {
    label: "Voo",
    color: "blue",
  },
  hotel: {
    label: "Hotel",
    color: "green",
  },
  car: {
    label: "Carro",
    color: "yellow",
  },
  activity: {
    label: "Atividade",
    color: "purple",
  },
};

export const AllReservationStatus: ReservationModel["status"][] = [
  "confirmed",
  "pending",
  "cancelled",
];

export const ReservationStatusPreparation: Record<
  ReservationModel["status"],
  {
    label: string;
    color: string;
  }
> = {
  confirmed: {
    label: "Confirmado",
    color: "green",
  },
  pending: {
    label: "Pendente",
    color: "yellow",
  },
  cancelled: {
    label: "Cancelado",
    color: "red",
  },
};
