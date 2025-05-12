import { useAlert } from "@/hooks/useAlert";
import { ModalActions } from "@/interfaces/ModalActions";
import { AddTripModel, TripModel } from "@/interfaces/Trip";
import { addTrip } from "@/requests/trips/add";
import { updateTripById } from "@/requests/trips/update-by-id";
import { AllTripStatus, TripStatusPreparation } from "@/utils/constants/trip";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DateInputWithLabel } from "../Fields/DateInputWithLabel";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { SelectWithLabel } from "../Fields/SelectWithLabel";
import { Button } from "../Shared/Button";

interface UserModalProps {
  props: ModalActions<TripModel>;
  setProps: React.Dispatch<React.SetStateAction<ModalActions<TripModel>>>;
  callback?: () => Promise<void> | void;
}

export const TripModal = ({ props, setProps, callback }: UserModalProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTripModel>();

  useEffect(() => {
    if (props?.data) {
      reset({
        startDate: props.data.startDate?.split("T")[0] || "",
        name: props.data.name,
        status: props.data.status,
      });
    }
  }, [props.data, reset]);

  const onReset = () => {
    reset();
    setLoading(false);
    setProps({ action: "none", open: false, data: undefined });
  };

  const handleAddTrip = async (data: AddTripModel) => {
    await addTrip(data, session?.accessToken || "");
    if (callback) await callback();
  };

  const handleEditrip = async (id: string, data: Partial<AddTripModel>) => {
    await updateTripById(id, data, session?.accessToken || "");
    if (callback) await callback();
  };

  const handleAction = async (data: AddTripModel) => {
    setLoading(true);

    try {
      if (props.action === "add") await handleAddTrip(data);
      if (props.action === "update")
        await handleEditrip(props.data?.id || "", data);

      onReset();
    } catch {
      setLoading(false);

      return showAlert(
        "danger",
        `Erro ao ${
          props.action === "add"
            ? "criar"
            : props.action === "update"
            ? "editar"
            : "excluir"
        } viagem!`
      );
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`${
        props.open ? "opacity-100 visible" : "opacity-0 invisible"
      } z-3 fixed bg-black bg-opacity-50 top-0 right-0 left-0 w-full h-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center overflow-y-auto overflow-x-hidden transition-opacity duration-300`}
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
                : "Excluir"}{" "}
              Viagem
            </h3>
            <div className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex justify-center items-center ">
              <Button
                type="link"
                htmlProps={{
                  onClick: onReset,
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </Button>
            </div>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(handleAction)}>
            <div className="grid gap-4 mb-4 grid-cols-1">
              <DateInputWithLabel
                name="startDate"
                inputProps={{
                  ...register("startDate", {
                    required: "Data de início é obrigatória",
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

              <InputWithLabel
                name="name"
                inputProps={{
                  placeholder: "Ubatuba",
                  ...register("name", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Nome deve ter pelo menos 3 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "Nome deve ter no máximo 50 caracteres",
                    },
                  }),
                }}
                label={{
                  html: { htmlFor: "name" },
                  children: "Nome da viagem",
                }}
                errors={errors}
              />

              <SelectWithLabel
                name="status"
                selectProps={{
                  ...register("status", {
                    required: "Status é obrigatório",
                  }),
                }}
                label={{
                  html: { htmlFor: "status" },
                  children: "Status da viagem",
                }}
                options={AllTripStatus.map((value) => ({
                  value: value,
                  label: TripStatusPreparation[value].label,
                }))}
                errors={errors}
              />
              <div className="flex flex-col space-y-4">
                <Button
                  htmlProps={{
                    type: "submit",
                  }}
                  loading={loading}
                >
                  {props.action === "add" ? "Criar" : "Editar"} Viagem
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
