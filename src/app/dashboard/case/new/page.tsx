import ReportEditor from "@/components/reports/ReportEditor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "File New Case",
};

function Page() {
  return <ReportEditor />;
}

export default Page;
