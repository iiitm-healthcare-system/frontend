import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootStyleRegistry from "./emotion";
import { Notifications } from "@/components/mantine.helper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IIITM Health Center",
  description: "Portal for IIITM Health Center",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStyleRegistry>
          <Notifications />
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  );
}
