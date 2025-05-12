"use client";

import { EmptyCard } from "@/components/Cards/EmptyCard";
import { TripCard } from "@/components/Cards/TripCard";
import { TripDrawer } from "@/components/Drawers/TripDrawer";
import { TripModal } from "@/components/Modals/TripModal";
import { Button } from "@/components/Shared/Button";
import { Spinner } from "@/components/Shared/Spinner";
import { ModalActions } from "@/interfaces/ModalActions";
import { TripModel } from "@/interfaces/Trip";
import { loadTrips } from "@/requests/trips/load-all";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

// O ideal seria criar uma lógica de paginação para os Cards de Viagem
const PAGE = 1;
const TRIPS_PER_PAGE = 9999;

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [tripDrawerOpenId, setTripDrawerOpenId] = useState<string | undefined>(
    undefined
  );
  const [tripModalProps, setTripModalProps] = useState<ModalActions<TripModel>>(
    {
      action: "none",
      open: false,
      data: undefined,
    }
  );

  const [trips, setTrips] = useState<TripModel[]>([]);

  const { data: session, status } = useSession();

  const fetchTrips = async () => {
    const trips = await loadTrips(
      {
        page: PAGE,
        limit: TRIPS_PER_PAGE,
      },
      session?.accessToken || ""
    );

    if (trips) setTrips(trips.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (status === "authenticated") fetchTrips();
  }, [status]);

  return (
    <>
      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Image
            className="h-14 w-50"
            src="/logo.svg"
            alt="Logo da Wconnect"
            width={151}
            height={56}
          />
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <Button
                  key="nav-profile"
                  type="link"
                  htmlProps={{
                    onClick: () => {
                      setTripModalProps({
                        action: "add",
                        open: true,
                        data: undefined,
                      });
                    },
                  }}
                >
                  Nova viagem
                </Button>
              </li>
              <li>
                <Button
                  key="nav-profile"
                  type="danger"
                  htmlProps={{
                    onClick: () =>
                      signOut({
                        callbackUrl: "/",
                      }),
                  }}
                >
                  Sair
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main
        className="max-w p-4 bg-gray-100"
        style={{
          minHeight: "calc(100vh - 88px)",
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-4">
            {trips?.length === 0 ? (
              <EmptyCard />
            ) : (
              trips.map((trip, index) => (
                <TripCard
                  trip={trip}
                  key={index}
                  onClick={(id) => setTripDrawerOpenId(id)}
                />
              ))
            )}
          </div>
        )}
      </main>
      <TripModal
        key="trip-modal"
        props={tripModalProps}
        setProps={setTripModalProps}
        callback={fetchTrips}
      />
      <TripDrawer
        key="trip-drawer"
        openId={tripDrawerOpenId}
        onClose={() => setTripDrawerOpenId(undefined)}
      />
    </>
  );
}
