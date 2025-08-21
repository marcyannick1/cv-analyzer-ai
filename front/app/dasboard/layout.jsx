import { Geist, Geist_Mono } from "next/font/google";
// import AuthProvider from "../components/shared/AuthProvider";
import Layout from "../components/Layout/Layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Siège Musdeel",
  description:
    "Musdeel est une plateforme centralisée pour le siège, permettant de superviser et gérer les hôpitaux, leurs activités, et le personnel à grande échelle.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AuthProvider> */}
        <div className="flex flex-col h-screen">
          <Layout>{children}</Layout>
        </div>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
