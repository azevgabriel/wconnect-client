"use client";

import { InputWithLabel } from "@/components/Fields/InputWithLabel";
import { Button } from "@/components/Shared/Button";
import { useAlert } from "@/hooks/useAlert";
import { AddUserModel } from "@/interfaces/User";
import { registerUser } from "@/requests/users/register";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useRouter();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddUserModel & { confirmPassword: string }>();

  const [loading, setLoading] = useState(false);

  const handleAction = async (data: AddUserModel) => {
    setLoading(true);

    try {
      await registerUser(data);
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/inicio",
      });
      setLoading(false);
    } catch {
      setLoading(false);
      return showAlert("danger", `Erro ao criar usuário!`);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          className="h-20 w-71"
          src="/logo.svg"
          alt="Logo da Wconnect"
          width={151}
          height={56}
        />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Crie sua conta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleAction)}
            >
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
                <InputWithLabel
                  name="password"
                  inputProps={{
                    type: "password",
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
                  name="confirmPassword"
                  inputProps={{
                    type: "password",
                    placeholder: "segredo_super_secreto_confirmado",
                    ...register("confirmPassword", {
                      required: "Confirmação de senha é obrigatória",
                      minLength: {
                        value: 6,
                        message: "Senha deve ter pelo menos 6 caracteres",
                      },
                      validate: (value) =>
                        value === watch("password") ||
                        "As senhas não coincidem",
                    }),
                  }}
                  label={{
                    html: { htmlFor: "confirmPassword" },
                    children: "Confirme sua senha",
                  }}
                  errors={errors}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Button
                  htmlProps={{
                    type: "submit",
                  }}
                  loading={loading}
                >
                  Criar Usuário
                </Button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-500">
              Você já tem uma conta?
              <Button
                type="link"
                htmlProps={{
                  onClick: () => {
                    navigate.push("/");
                  },
                }}
              >
                Faça login
              </Button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
