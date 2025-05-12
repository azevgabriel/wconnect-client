import { AlertProvider } from "@/hooks/useAlert";
import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

const robotofont = Roboto({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
});

const montserratFont = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wconnect",
  description: "Roteiros de Viagem com processamente assíncrono de reservas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${robotofont.variable} ${montserratFont.variable} `}>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
