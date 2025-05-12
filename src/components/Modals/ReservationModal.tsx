import { useAlert } from "@/hooks/useAlert";
import { ModalActions } from "@/interfaces/ModalActions";
import {
  AddReservationModel,
  ReservationModel,
} from "@/interfaces/Reservation";
import { addReservation } from "@/requests/reservations/add";
import { disableReservationById } from "@/requests/reservations/disable-by-id";
import { updateReservationById } from "@/requests/reservations/update-by-id";
import { ReservationTypePreparation } from "@/utils/constants/reservation";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DateInputWithLabel } from "../Fields/DateInputWithLabel";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { SelectWithLabel } from "../Fields/SelectWithLabel";
import { Button } from "../Shared/Button";

interface ReservationModalProps {
  props: ModalActions<Partial<ReservationModel> & { tripId: string }>;
  setProps: React.Dispatch<
    React.SetStateAction<
      ModalActions<Partial<ReservationModel> & { tripId: string }>
    >
  >;
  callback?: () => Promise<void> | void;
  tripId: string;
}

export const ReservationModal = ({
  props,
  setProps,
  callback,
  tripId,
}: ReservationModalProps) => {
  const { data: session } = useSession();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Omit<AddReservationModel, "tripId">>();

  const startDateValue = watch("startDate");

  useEffect(() => {
    if (props.action === "update" && props.data) {
      reset({
        startDate: props.data.startDate?.split("T")[0] || "",
        endDate: props.data.endDate?.split("T")[0] || "",
        type: props.data.type,
        value: props.data.value,
        status: props.data.status,
      });
    }
  }, [props.data, props.action, reset]);

  const onReset = () => {
    setLoading(false);
    reset();
    setProps({ action: "none", open: false, data: undefined });
  };

  const handleAddReservation = async (
    data: Omit<AddReservationModel, "tripId">
  ) => {
    const payload: AddReservationModel = {
      ...data,
      tripId: tripId || "",
    };

    await addReservation(payload, session?.accessToken || "");
  };

  const handleUpdateReservation = async (
    data: Omit<AddReservationModel, "tripId">
  ) => {
    if (!props.data?.id) throw new Error("ID da reserva não encontrado");

    await updateReservationById(
      props.data.id,
      data,
      session?.accessToken || ""
    );
  };

  const handleDisableReservation = async () => {
    if (!props.data?.id) throw new Error("ID da reserva não encontrado");

    try {
      await disableReservationById(props.data.id, session?.accessToken || "");
      if (callback) await callback();
      onReset();
    } catch {
      showAlert("danger", `Erro ao excluir reserva!`);
      setLoading(false);
    }
  };

  const handleAction = async (data: Omit<AddReservationModel, "tripId">) => {
    setLoading(true);
    data = {
      ...data,
      value: Number(data.value),
    };

    try {
      if (props.action === "add") await handleAddReservation(data);
      if (props.action === "update") await handleUpdateReservation(data);

      if (callback) await callback();
      onReset();
    } catch {
      showAlert(
        "danger",
        `Erro ao ${props.action === "add" ? "criar" : "editar"} reserva!`
      );
      setLoading(false);
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`${
        props.open ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center overflow-y-auto overflow-x-hidden transition-opacity duration-300`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div
          className={`relative bg-white rounded-lg shadow-sm transform transition-transform duration-300 ${
            props.open ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {props.action === "add"
                ? "Criar"
                : props.action === "update"
                ? "Editar"
                : "Deletar"}{" "}
              Reserva
            </h3>
            <div className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex justify-center items-center ">
              <Button type="link" htmlProps={{ onClick: onReset }}>
                <X />
              </Button>
            </div>
          </div>
          {props?.action === "delete" ? (
            <>
              <div className="p-4 md:p-5">
                <h3 className="text-md  text-gray-900">
                  Tem certeza que deseja excluir a reserva de{" "}
                  {
                    ReservationTypePreparation[props.data?.type || "activity"]
                      .label
                  }
                </h3>
              </div>
              <div className="flex flex-row space-x-4 p-4">
                <div className="flex-1">
                  <Button
                    htmlProps={{
                      onClick: onReset,
                      disabled: loading,
                      className: "w-full",
                    }}
                  >
                    Não
                  </Button>
                </div>
                <div className="flex-1">
                  <Button
                    htmlProps={{
                      onClick: handleDisableReservation,
                      className: "w-full",
                    }}
                    type="danger"
                    loading={loading}
                  >
                    Sim
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <form className="p-4 md:p-5" onSubmit={handleSubmit(handleAction)}>
              <div className="grid gap-4 mb-4">
                <DateInputWithLabel
                  name="startDate"
                  inputProps={{
                    ...register("startDate", {
                      required: "Data inicial obrigatória",
                      validate: (value) => {
                        const today = new Date();
                        const selectedDate = new Date(value);
                        return (
                          selectedDate >= today ||
                          "Data de início não pode ser anterior à data atual"
                        );
                      },
                    }),
                  }}
                  errors={errors}
                  label={{
                    html: { htmlFor: "startDate" },
                    children: "Data de Início",
                  }}
                />

                <DateInputWithLabel
                  name="endDate"
                  inputProps={{
                    ...register("endDate", {
                      required: "Data final obrigatória",
                      validate: (endDate) => {
                        if (!startDateValue || !endDate) return true;

                        const start = new Date(startDateValue);
                        start.setHours(0, 0, 0, 0);
                        const end = new Date(endDate);
                        end.setHours(0, 0, 0, 0);
                        return (
                          start < end ||
                          "Data final deve ser maior que a inicial"
                        );
                      },
                    }),
                  }}
                  errors={errors}
                  label={{
                    html: { htmlFor: "endDate" },
                    children: "Data de Fim",
                  }}
                />

                <SelectWithLabel
                  name="type"
                  label={{
                    html: { htmlFor: "type" },
                    children: "Tipo de Reserva",
                  }}
                  selectProps={{
                    ...register("type", { required: "Tipo é obrigatório" }),
                  }}
                  options={[
                    { value: "flight", label: "Voo" },
                    { value: "hotel", label: "Hotel" },
                    { value: "car", label: "Carro" },
                    { value: "activity", label: "Atividade" },
                  ]}
                  errors={errors}
                />

                <InputWithLabel
                  name="value"
                  inputProps={{
                    type: "number",
                    step: "0.01",
                    ...register("value", {
                      required: "Valor é obrigatório",
                      min: { value: 0, message: "Valor deve ser positivo" },
                    }),
                  }}
                  label={{
                    html: { htmlFor: "value" },
                    children: "Valor (R$)",
                  }}
                  errors={errors}
                />

                <Button htmlProps={{ type: "submit" }} loading={loading}>
                  {props.action === "add" ? "Criar" : "Editar"} Reserva
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
