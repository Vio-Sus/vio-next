import React, { useState } from "react";
import Button from "../button/ButtonShort";
import ButtonPrimary from "../button/ButtonPrimary";
import * as XLSX from "xlsx";
import axios from "axios";
import UploadSuccess from "@/components/box/UploadSuccess";
import { useSession } from "next-auth/react";
import RedirectButton from "../button/RedirectButton";
interface SheetData {
  [key: string]: any;
}

const ImportXlsxCsv: React.FC = () => {
  const WasteType = [
    "MIXED_PAPER",
    "GENERAL_GARBAGE",
    "FOODWASTE",
    "GREENWASTE",
    "CARDBOARD",
    "CLEAN_WOOD",
    "MIXED_CONTAINERS",
    "STYROFOAM",
    "SOFT_PLASTICS",
    "OFPP_",
    "APPLIANCES",
    "E_WASTE",
    " LIGHTS",
    "BATTERIES",
    "MATTRESSES",
    "GLASS",
    "NEW_GYPSUM",
    "METAL",
    "CONCRETE",
  ];

  const Sites = [
    "Vancouver Site",
    "Richmond Site",
    "Delta Site",
    "Langley Site",
    "North Vancouver Site",
    "West Vancouver Site",
  ];

  const Collaborators = [
    "company_1",
    "company_2",
    "company_3",
    "company_4",
    "company_5",
    "company_6",
    "company_7",
    "company_8",
    "company_9",
    "company_10",
  ];

  const [sheetData, setSheetdata] = useState<SheetData[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [fileName, setFileName] = useState("");
  const user = useSession();
  console.log("user", user);

  const readExcel = (file: File) => {
    const promise = new Promise<SheetData[]>((resolve, reject) => {
      const fileReader = new FileReader();
      if (file) {
        setFileName(file.name);
        // console.log(file.name)
        fileReader.readAsArrayBuffer(file);
        // fileReader.readAsBinaryString(file)

        fileReader.onload = (e) => {
          const bufferArray = e.target?.result;
          const workBook = XLSX.read(bufferArray, { type: "buffer" });
          const workSheetName = workBook.SheetNames[0];
          const workSheet = workBook.Sheets[workSheetName];
          const data = XLSX.utils.sheet_to_json(workSheet) as SheetData[];
          resolve(data);
          console.log(data);
          // console.log(data[1]["Transaction Date"])
          const array: { accountCode: any; weight: any; waste: any }[] = [];
          for (let i = 0; i < data.length; i++) {
            const obj = {
              accountCode: data[i]["ARAccount Code"],
              weight: data[i]["Weighing Quantity (mt)"],
              waste: data[i]["Weighing Material"]
                .replace("Loose", "")
                .replace(/[\r\n]+/g, "")
                // slice the last character not the first
                .slice(0, -1),
              id: data[i]["Ticket No"],
              transactionDate: data[i]["Transaction Date"],
            };
            array.push(obj);
          }
          console.log("array", array);
          setSheetdata(array);
        };
      }
      fileReader.onerror = (err) => {
        reject(err);
      };
    });

    promise.then((d) => {
      console.log(d);
    });
  };

  const openFileChooser = () => {
    document.getElementById("file")!.click();
  };

  console.log(fileName);

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    axios
      .post("/api/entry", {
        data: sheetData,
        user,
      })
      .then((res) => {
        console.log(res);
        setShowSuccessAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {showSuccessAlert && <UploadSuccess />}
      <div>
        <form>
          <label htmlFor="file">
            {sheetData.length <= 0 && (
              <Button text="Upload" type="button" onClick={openFileChooser} />
            )}
          </label>

          <input
            onChange={(e) => {
              const file = e.target.files![0];
              readExcel(file);
            }}
            name="file"
            type="file"
            id="file"
            style={{ display: "none" }}
          />
          {sheetData.length > 0 && (
            <>
              <Button text="Submit" type="submit" onClick={handleSubmit} />
              <div className="w-1/3">
                <RedirectButton
                  onClick={() => console.log("clicked")}
                  redirect="/entry"
                >
                  Upload new sheet
                </RedirectButton>
              </div>
            </>
          )}
        </form>

        {sheetData.length > 0 && (
          <div className="flex justify-between gap-2">
            <form>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  console.log(sheetData);
                  setSheetdata(
                    sheetData.map((item) => {
                      return {
                        ...item,
                        site: value,
                      };
                    })
                  );
                }}
                id="countries"
                className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#9FDF97]"
              >
                <option value="0">Select your Site</option>
                {Sites.map((site) => {
                  return (
                    <option key={site} value={site}>
                      {site}
                    </option>
                  );
                })}
              </select>
            </form>
            <form>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  console.log(sheetData);
                  setSheetdata(
                    sheetData.map((item) => {
                      return {
                        ...item,
                        waste_type: value,
                      };
                    })
                  );
                }}
                id="countries"
                className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#9FDF97]"
              >
                <option value="0">Select a waste type</option>
                {WasteType.map((waste) => {
                  return (
                    <option key={waste} value={waste}>
                      {waste}
                    </option>
                  );
                })}
              </select>
            </form>
            <form>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  console.log(sheetData);
                  setSheetdata(
                    sheetData.map((item) => {
                      return {
                        ...item,
                        collaborator: value,
                      };
                    })
                  );
                }}
                id="countries"
                className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#9FDF97]"
              >
                <option value="0">Select Collaborator</option>
                {Collaborators.map((c) => {
                  return (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        )}
        <table>
          <thead>
            <tr className="px-2 m-4">
              {sheetData.length > 0 &&
                Object.keys(sheetData[0]).map((key) => {
                  return (
                    <th key={self.crypto.randomUUID()}>{key.toUpperCase()}</th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {sheetData.length > 0 &&
              sheetData.map((row) => {
                return (
                  <tr key={self.crypto.randomUUID()}>
                    {Object.keys(row).map((key) => {
                      return (
                        <td className="px-4" key={self.crypto.randomUUID()}>
                          {row[key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ImportXlsxCsv;

// {uniqueSites.map((site: string) => {
//   return (
//     <option key={site} value={site}>
//       {year}
//     </option>
//   );
// })}
