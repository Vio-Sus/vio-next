import React, { useMemo, useState } from "react";
import ImportXlsxCsv from "@/components/input/ImportXlsxCsv";
import { useSession } from "next-auth/react";
import { prisma } from "../../../server/db/client";
import DataTable from "react-data-table-component";

export type EntriesType = {
  id: string;
  name: string;
  creationTime: string | Date;
  jsonArray: [] | number;
};


// export type 


// const rowDisabledCriteria = (row:any) => row.isOutOfStock;

const columns2 = [
  {
    name: "Id",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "creationTime",
    selector: (row: any) => row.creationTime,
    sortable: true,
  },
  {
    name: "Number of Rows",
    selector: (row: any) => row.jsonArray,
    sortable: true,
  },
];

export default function entry({ allTheData }: any) {
  const [selectedData, setSelectedData] = useState([])
  const theSelectCallBack = ({
    allSelected,
    selectedCount,
    selectedRows,
  }: any) => {
    console.log(selectedRows);
    setSelectedData(selectedRows)
  };
  return (
    <>
      <DataTable
        columns={columns2}
        data={allTheData}
        striped
        highlightOnHover
        noDataComponent
        selectableRows
        onSelectedRowsChange={theSelectCallBack}
      />
    </>
  );
}

export async function getServerSideProps() {
  const jsonArrayFromBackend = await prisma.testingData.findMany({});

  const listOfAllDataJSON = JSON.parse(JSON.stringify(jsonArrayFromBackend));

  // console.log(listOfAllDataJSON[0].jsonArray.length)
  listOfAllDataJSON.map((m: EntriesType) => {
    let theAmountOFData;
    if (Array.isArray(m.jsonArray)) {
      theAmountOFData = m.jsonArray.length;
      m.jsonArray = theAmountOFData;
    }
  });

  let returnArray = [];
  for (const key in listOfAllDataJSON[0]) {
    // console.log({name: key, selector: (row: any) => row.year,})
    returnArray.push({ name: key, selector: (row: any) => row.year });
  }

  const returnArrayJson = JSON.parse(JSON.stringify(returnArray));

  // console.log(typeof listOfAllDataJSON[0].creationTime)
  // console.log(listOfAllDataJSON)

  return {
    props: {
      allTheData: listOfAllDataJSON,
      columns: returnArrayJson,
    },
  };
}

// const columns = useMemo(() => {
//   let returnArray = []
//   for (const key in allTheData[0].jsonArray[0]) {
//     // console.log({name: key, selector: (row: any) => row.year,})
//     returnArray.push({name: key, selector: (row: any) => row.year,})
//   }
//   console.log(allTheData[0].jsonArray[0])
//   return returnArray
// }, [])

// return (
//   <>
//     <DataTable
//           columns={columns}
//           data={allTheData[0].jsonArray}
//       />
//   </>
// );
