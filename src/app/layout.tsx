import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import GlobalSignupModal from "@/components/GlobalSignupModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Equilibra Mind - Sua jornada para o equilíbrio",
  description: "Plataforma de saúde emocional e bem-estar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <GlobalSignupModal />
        </Providers>
      </body>
    </html>
  );
}
