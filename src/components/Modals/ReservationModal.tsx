// import { useSession } from "@/hooks/useSession";
import { ModalActions } from "@/interfaces/ModalActions";
import { AddUserModel, UserModel } from "@/interfaces/User";
// import { addUserRequest } from "@/requests/users/add-user";
// import { deleteUserByIdRequest } from "@/requests/users/delete-user-by-id";
// import { updateUserRequestById } from "@/requests/users/update-user-by-id";
import { useAlert } from "@/hooks/useAlert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { Button } from "../Shared/Button";

interface UserModalProps {
  props: ModalActions<UserModel>;
  setProps: React.Dispatch<React.SetStateAction<ModalActions<UserModel>>>;
  callback?: () => Promise<void> | void;
}

export const ReservationModal = ({ props, setProps }: UserModalProps) => {
  // const { user, login } = useSession();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: undefined as string | undefined,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const onReset = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      role: undefined,
      password: "",
      confirmPassword: "",
    });
    setLoading(false);
    setProps({ action: "none", open: false, data: undefined });
  };

  const handleAddUser = async (data: AddUserModel) => {
    console.log("Add user data", data);

    // await addUserRequest({ name, email, password });

    // if (callback) await callback();
    // await login({
    //   password,
    //   email,
    // });
    onReset();
  };

  const handleAction = async (data: unknown) => {
    setLoading(true);

    try {
      if (props.action === "add") await handleAddUser(data as AddUserModel);
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
        } usuário!`
      );
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
                : "Excluir"}{" "}
              Usuário
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
          {props?.action === "delete" ? (
            <>
              <div className="p-4 md:p-5">
                <h3 className="text-md  text-gray-900">
                  Tem certeza que deseja excluir o usuário{" "}
                  <b>
                    {props.data?.name} ({props.data?.email})?
                  </b>
                </h3>
              </div>
              <div className="flex flex-row space-x-4 space-y-4">
                <div className="flex flex-col flex-5">
                  <Button
                    htmlProps={{
                      onClick: onReset,
                      disabled: loading,
                    }}
                  >
                    Não
                  </Button>
                </div>
                <div className="flex flex-col flex-4">
                  <Button
                    htmlProps={{
                      onClick: () => {},
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
              <div className="grid gap-4 mb-4 grid-cols-1">
                <InputWithLabel
                  name="name"
                  inputProps={{
                    placeholder: "João da Silva",
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
                    children: "Seu nome",
                  }}
                  errors={errors}
                />
                <InputWithLabel
                  name="email"
                  inputProps={{
                    placeholder: "name@example.com",
                    ...register("email", {
                      required: "Email é obrigatório",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email inválido",
                      },
                    }),
                  }}
                  label={{
                    html: { htmlFor: "email" },
                    children: "Seu e-mail",
                  }}
                  errors={errors}
                />
                {props?.action === "add" && (
                  <>
                    <InputWithLabel
                      name="password"
                      inputProps={{
                        placeholder: "segredo_super_secreto",
                        ...register("password", {
                          required: "Senha é obrigatória",
                          minLength: {
                            value: 6,
                            message: "Senha deve ter pelo menos 6 caracteres",
                          },
                        }),
                      }}
                      label={{
                        html: { htmlFor: "password" },
                        children: "Sua senha",
                      }}
                      errors={errors}
                    />
                    <InputWithLabel
                      name="confirm-password"
                      inputProps={{
                        placeholder: "segredo_super_secreto_confirmado",
                        ...register("confirmPassword", {
                          required: "Confirmação de senha é obrigatória",
                          minLength: {
                            value: 6,
                            message: "Senha deve ter pelo menos 6 caracteres",
                          },
                          validate: (value) =>
                            value === formData.password ||
                            "As senhas não conferem",
                        }),
                      }}
                      label={{
                        html: { htmlFor: "confirm-password" },
                        children: "Confirme sua senha",
                      }}
                      errors={errors}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <Button
                  htmlProps={{
                    type: "submit",
                  }}
                  loading={loading}
                >
                  {props.action === "add" ? "Criar" : "Editar"} Usuário
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
