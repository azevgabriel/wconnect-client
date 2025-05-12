import { ModalActions } from "@/interfaces/ModalActions";
import { ReservationModel } from "@/interfaces/Reservation";
import { TripModel, TripModelWithReservations } from "@/interfaces/Trip";
import { loadTripById } from "@/requests/trips/load-by-id";
import {
  ReservationStatusPreparation,
  ReservationTypePreparation,
} from "@/utils/constants/reservation";
import { TripStatusPreparation } from "@/utils/constants/trip";
import { format } from "date-fns";
import { Pencil, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { TripModal } from "../Modals/TripModal";
import { Badge } from "../Shared/Badge";
import { Button } from "../Shared/Button";

interface TripDrawerProps {
  openId: string | undefined;
  onClose: () => void;
}

export const TripDrawer = ({ openId, onClose }: TripDrawerProps) => {
  const { data: session, status } = useSession();

  const [tripModalProps, setTripModalProps] = useState<ModalActions<TripModel>>(
    {
      action: "none",
      open: false,
      data: undefined,
    }
  );
  const [reservationModalProps, setReservationModalProps] = useState<
    ModalActions<ReservationModel>
  >({
    action: "none",
    open: false,
    data: undefined,
  });

  const [trip, setTrip] = useState<TripModelWithReservations | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (openId && status === "authenticated") {
      setLoading(true);
      loadTripById(openId, session?.accessToken || "")
        .then(setTrip)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [openId, status]);

  if (!openId) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-1 cursor-not-allowed"
        onClick={(e) => e.stopPropagation()} // impede cliques fora
      />
      <div
        id="drawer-trip"
        className={`fixed top-0 left-0 z-2 h-screen p-4 overflow-y-auto transition-all ${
          openId ? "translate-x-0" : "-translate-x-full"
        } bg-white w-2/5`}
        tabIndex={-1}
        aria-labelledby="drawer-trip-label"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {trip?.name || "Carregando..."}
          </h2>
          <div className="flex space-x-2">
            {trip && (
              <Button
                type="link"
                htmlProps={{
                  onClick: () => {
                    setTripModalProps({
                      action: "update",
                      open: true,
                      data: trip,
                    });
                  },
                }}
              >
                <Pencil />
              </Button>
            )}
            <Button
              htmlProps={{
                onClick: onClose,
              }}
              type="link"
            >
              <X />
            </Button>
          </div>
        </div>

        {loading || !trip ? (
          <p className="text-gray-500">Carregando detalhes...</p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              <Badge {...TripStatusPreparation[trip.status]} size="sm" />
              {format(`${trip.startDate.split("T")[0]}T03:00:00`, "dd/MM/yyyy")}
            </p>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg">Reservas</h3>
                <Button
                  type="link"
                  htmlProps={{
                    onClick: () => {
                      setReservationModalProps({
                        action: "add",
                        open: true,
                        data: undefined,
                      });
                    },
                  }}
                >
                  Nova reserva
                </Button>
              </div>

              <div className="space-y-3">
                {trip.reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 border rounded flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        {ReservationTypePreparation[
                          res.type
                        ].label.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(
                          `${res.startDate.split("T")[0]}T03:00:00`,
                          "dd/MM/yyyy"
                        )}
                        {" - "}
                        {format(
                          `${res.endDate.split("T")[0]}T03:00:00`,
                          "dd/MM/yyyy"
                        )}
                        {" - "}
                        {Math.ceil(
                          (new Date(res.endDate).getTime() -
                            new Date(res.startDate).getTime()) /
                            (1000 * 3600 * 24)
                        )}{" "}
                        dias
                      </p>
                      <p className="text-xs">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(res.value)}
                        {" - "}
                        {ReservationStatusPreparation[res.status].label}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="link"
                        htmlProps={{
                          onClick: () => {
                            setReservationModalProps({
                              action: "update",
                              open: true,
                              data: res,
                            });
                          },
                        }}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        type="danger"
                        htmlProps={{
                          onClick: () => {
                            setReservationModalProps({
                              action: "delete",
                              open: true,
                              data: res,
                            });
                          },
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <TripModal
        props={tripModalProps}
        setProps={setTripModalProps}
        key="edit-trip-modal"
        callback={fetchData}
      />
      <ReservationModal
        props={reservationModalProps}
        setProps={setReservationModalProps}
        key="reservation-modal"
        callback={fetchData}
        tripId={openId}
      />
    </>
  );
};
