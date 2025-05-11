"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session?.accessToken); // Deve conter seu JWT

  return (
    <div>
      <h1>Bem-vindo ao Dashboard</h1>
    </div>
  );
}
