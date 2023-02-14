import React from "react";
import CSVUploader from "@/components/import/CsvUploader";
import ImportXlsxCsv from "@/components/input/ImportXlsxCsv";

export default function entry() {
  return (
    <div>
      <CSVUploader />
      <ImportXlsxCsv />
      entry
    </div>
  );
}
