import React, { useMemo, useState, useEffect } from "react";
import { prisma } from "../../../server/db/client";
import DataTable from "react-data-table-component";
import ButtonGoToCompare from "@/components/button/ButtonPrimary";
import { useRouter } from "next/router";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import axios from "axios";
import Banner from "@/components/box/Banner"
import { useSession } from 'next-auth/react'


export type EntriesType = {
  id: string;
  name: string;
  creationTime: string | Date;
  jsonArray: [] | number;
};

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
    selector: (row: any) => row.created_at,
    sortable: true,
  }
];

export default function entry({ allTheData }: any) {
  const user = useSession()

  useEffect(() => {
    allTheData = allTheData.filter((m: any) => m.userEmail = user.data?.user?.email)
    console.log(allTheData);
  }, [])


  const router = useRouter();

  const [selectedData, setSelectedData] = useState([]);
  const theSelectCallBack = ({
    allSelected,
    selectedCount,
    selectedRows,
  }: any) => {
    console.log(selectedRows);
    let arrayOfIds = selectedRows.map((m: EntriesType) => {
      return m.id;
    });
    // console.log(arrayOfIds);
    setSelectedData(arrayOfIds);
  };


  async function handleDelete() {
    await axios.post("/api/deleteFileEntry", selectedData)
      router.push("/");
  }

  return (
    <>
    {allTheData.length > 0 ?
    
      <DataTable
        columns={columns2}
        data={allTheData}
        striped
        highlightOnHover
        noDataComponent
        selectableRows
        onSelectedRowsChange={theSelectCallBack}
      />
      :
      <Banner text={"No Input available"} color={"red"} />
      // <p>You need to input something</p>
    }
      {selectedData.length > 0 && (<div className="mt-10">
        <ButtonPrimary onClick={handleDelete} children="Delete" />
      </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  console.log("bow");
  const jsonArrayFromBackend = await prisma.entryFile.findMany({
    include: {
      user: {
        select: {
          email: true
        }
      }
    }
  });

  const listOfAllDataJSON = JSON.parse(JSON.stringify(jsonArrayFromBackend));

  return {
    props: {
      allTheData: listOfAllDataJSON,
    },
  };
}
