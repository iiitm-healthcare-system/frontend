import ReportViewer from "@/components/reports/ReportViewer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manage Case",
};

function Page() {
  return <ReportViewer />;
}

export default Page;
