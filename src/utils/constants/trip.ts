import { TripStatus } from "@/interfaces/Trip";

export const AllTripStatus: TripStatus[] = [
  "planned",
  "in_progress",
  "completed",
  "canceled",
];

export const TripStatusPreparation: Record<
  TripStatus,
  {
    label: string;
    color: "red" | "blue" | "green" | "yellow";
  }
> = {
  planned: {
    label: "Planejado",
    color: "blue",
  },
  in_progress: {
    label: "Em andamento",
    color: "yellow",
  },
  completed: {
    label: "Concluído",
    color: "green",
  },
  canceled: {
    label: "Cancelado",
    color: "red",
  },
};
