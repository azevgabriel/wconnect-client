import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { Button } from "../Shared/Button";

export const AuthenticateForm = () => {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [loading, setLoading] = useState(false);

  const handleLoginForm = async (data: { email: string; password: string }) => {
    setLoading(true);

    try {
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/inicio",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          className="h-20 w-71"
          src="/logo.svg"
          alt="logo"
          width={384}
          height={108}
        />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Faça login na sua conta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLoginForm)}
            >
              <InputWithLabel
                name="email"
                inputProps={{
                  type: "email",
                  placeholder: "name@example.com",
                  ...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email inválido",
                    },
                  }),
                }}
                label={{
                  html: { htmlFor: "email" },
                  children: "Seu e-mail",
                }}
                errors={errors.email}
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
                errors={errors.password}
              />
              <div className="flex flex-col space-y-4">
                <Button
                  htmlProps={{
                    type: "submit",
                  }}
                  loading={loading}
                >
                  Entrar
                </Button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-500">
              Você não tem uma conta ainda?
              <Button
                type="link"
                htmlProps={{
                  onClick: () => {
                    navigate.push("/registro");
                  },
                }}
              >
                Registre-se!
              </Button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
