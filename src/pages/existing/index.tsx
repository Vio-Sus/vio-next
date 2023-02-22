import React from "react";
import ImportXlsxCsv from "@/components/input/ImportXlsxCsv";
import { useSession } from "next-auth/react";
import { prisma } from "../../../server/db/client";

export default function entry({allTheData}: any) {



  return (
    <>
      <ImportXlsxCsv />
    </>
  );
}



export async function getServerSideProps() {
    
    const jsonArrayFromBackend = await prisma.testingData.findMany({});

    const listOfAllDataJSON = JSON.parse(JSON.stringify(jsonArrayFromBackend)) 
    
    console.log(listOfAllDataJSON)
  
    return {
      props: {
        allTheData: listOfAllDataJSON
      },
    };
  }
  