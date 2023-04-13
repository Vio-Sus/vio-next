import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FileUpload } from "primereact/fileupload";

export default function testingFileUpload() {
  return (
    <div>
      <div className="h-screen flex items-center">
        <div className="mx-auto">
          <FileUpload name="demo" url="/api/upload" className=""></FileUpload>
        </div>
      </div>
    </div>
  );
}
