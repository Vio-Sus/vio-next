import React from "react";
import CSVUploader from "@/components/import/CsvUploader";
import ImportXlsxCsv from "@/components/input/ImportXlsxCsv";
import { useSession } from "next-auth/react";

export default function entry() {

  const { data: session, status } = useSession();
  return (
    <>
      <ImportXlsxCsv />
    </>
  );
}
