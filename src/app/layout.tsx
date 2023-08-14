import "./globals.css";
import type { Metadata } from "next";
import RootStyleRegistry from "./emotion";
import { Notifications } from "@/components/mantine.helper";

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
      <body>
        <RootStyleRegistry>
          <Notifications />
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  );
}
