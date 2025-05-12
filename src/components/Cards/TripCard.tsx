import { TripModel } from "@/interfaces/Trip";
import { TripStatusPreparation } from "@/utils/constants/trip";
import { format } from "date-fns";
import { Badge } from "../Shared/Badge";

interface TripCardProps {
  trip: TripModel;
  onClick: (id: string) => void;
}

export const TripCard = ({ trip, onClick }: TripCardProps) => {
  const formattedDate = format(
    `${trip.startDate.split("T")[0]}T03:00:00`,
    "dd/MM/yyyy"
  );

  return (
    <div
      onClick={() => onClick(trip.id)}
      className="block max-w-sm px-10 py-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out"
    >
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {trip.name}
      </h5>
      <p className="text-sm text-gray-600 mb-4">
        Início: <span className="font-medium">{formattedDate}</span>
      </p>
      <p className="text-sm text-gray-600">
        <Badge {...TripStatusPreparation[trip.status]} size="sm" />
      </p>
    </div>
  );
};
