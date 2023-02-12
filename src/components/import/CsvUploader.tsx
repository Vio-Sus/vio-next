// import React, { useState } from 'react';

// interface Props { }

// const CsvUploader: React.FC<Props> = () => {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };  

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!file) {
//       return;
//     }
//     console.log(file)
//     const formData = new FormData();
//     formData.append('file', file);
//     console.log(formData)

//     try {
//       const response = await fetch('/api/csv', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Request failed with status code ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Success! Data:', data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} accept=".csv" />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default CsvUploader;

import React, { useState } from 'react';
import axios from 'axios';

const CSVUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/csv', file);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".csv"/>
      <button type="submit">Upload</button>
    </form>
  );
};

export default CSVUploader;
