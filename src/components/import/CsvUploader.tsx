import React, { useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";
import LineChart from "@/components/chart/LineChart";

function CSVUploader(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // setFile(selectedFile);
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          setFile(results.data)
          // console.log(results.data);
        },
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    try {
      // console.log(file)
      const response = await axios.post('/api/csv', file);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <button type="submit">Upload</button>
    </form>
  );
}

export default CSVUploader;
