import React, { useState } from 'react'
import Button from "../button/ButtonShort"
import ButtonPrimary from '../button/ButtonPrimary';
import * as XLSX from "xlsx"

interface SheetData {
    [key: string]: any;
}

const ImportXlsxCsv: React.FC = () => {

    const [sheetData, setsheetData] = useState<SheetData[]>([]);
    const readExcel = (file: File) => {
        const promise = new Promise<SheetData[]>((resolve, reject) => {
            const fileReader = new FileReader()
            if (file) {

                fileReader.readAsArrayBuffer(file)
                // fileReader.readAsBinaryString(file)

                fileReader.onload = (e) => {
                    const bufferArray = e.target?.result
                    const workBook = XLSX.read(bufferArray, { type: 'buffer' })
                    const workSheetName = workBook.SheetNames[0]
                    const workSheet = workBook.Sheets[workSheetName]
                    const data = XLSX.utils.sheet_to_json(workSheet) as SheetData[]
                    resolve(data)
                    setsheetData(data)
                }
            }
            fileReader.onerror = ((err) => {
                reject(err)
            })
        })

        promise.then((d) => {
            console.log(d);
        })
    }

    const openFileChooser = () => {
        document.getElementById("file")!.click()
    }

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        event.preventDefault();
        console.log(sheetData)
    }

    return (
        <div>
            <form >
                <label htmlFor="file">
                    {sheetData.length <= 0 && <Button text="Upload" type="button" onClick={openFileChooser} />}
                </label>

                <input onChange={(e) => {
                    const file = e.target.files![0]
                    readExcel(file)
                }} name="file" type="file" id="file"
                    style={{ display: 'none' }}
                />
                {sheetData.length > 0 && <Button text="Submit" type="submit" onClick={handleSubmit} />}
            </form>
            <table>
                <thead>
                    <tr>
                        {sheetData.length > 0 && Object.keys(sheetData[0]).map((key) => {
                            return <th key={self.crypto.randomUUID()}>{key.toUpperCase()}</th>
                        }
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sheetData.length > 0 && sheetData.map((row) => {
                        return (
                            <tr key={self.crypto.randomUUID()}>
                                {Object.keys(row).map((key) => {
                                    
                                    return <td key={self.crypto.randomUUID()}>{row[key]}</td>
                                }
                                )}
                            </tr>
                        )
                    }
                    )}
                </tbody>

            </table>
        </div>

    )
}

export default ImportXlsxCsv;