import React, { useMemo, useState } from "react";
import ImportXlsxCsv from "@/components/input/ImportXlsxCsv";
import { useSession } from "next-auth/react";
import { prisma } from "../../../server/db/client";
import DataTable from "react-data-table-component";
import ButtonGoToCompare from "@/components/button/ButtonPrimary";
import {useRouter} from "next/router";

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
  const [selectedData, setSelectedData] = useState([]);
  const [routeToGoTo, setRouteToGoTo] = useState("Month Compare")
  const theSelectCallBack = ({
    allSelected,
    selectedCount,
    selectedRows,
  }: any) => {
    
    console.log(selectedRows);
    let arrayOfIds = selectedRows.map((m: EntriesType) => {
      return m.id
    })
    console.log(arrayOfIds)
    setSelectedData(arrayOfIds);
  };


  const router = useRouter()


  async function handleRouting() {
    if (routeToGoTo == "Month Compare") {
      router.push(`/monthCompare/${JSON.stringify(selectedData)}`)
      console.log(`/monthCompare/${JSON.stringify(selectedData)}`)
      // console.log(`/monthCompare/${selectedData}`)
    }
  }


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
        <div className="relative max-w-xs mx-auto mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" onChange={(e) => setRouteToGoTo(e.target.value)}>
                <option>Month Compare</option>
            </select>
        </div>
      {selectedData.length > 0 && (
        <ButtonGoToCompare
          children="Go To That Compare Page"
          onClick={() => handleRouting()}
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const jsonArrayFromBackend = await prisma.testingData.findMany({});

  const listOfAllDataJSON = JSON.parse(JSON.stringify(jsonArrayFromBackend));

  listOfAllDataJSON.map((m: EntriesType) => {
    let theAmountOFData;
    if (Array.isArray(m.jsonArray)) {
      theAmountOFData = m.jsonArray.length;
      m.jsonArray = theAmountOFData;
    }
  });

  let returnArray = [];
  for (const key in listOfAllDataJSON[0]) {
    returnArray.push({ name: key, selector: (row: any) => row.year });
  }

  const returnArrayJson = JSON.parse(JSON.stringify(returnArray));

  return {
    props: {
      allTheData: listOfAllDataJSON,
      columns: returnArrayJson,
    },
  };
}
