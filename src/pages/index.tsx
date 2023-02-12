import LineChart from "@/components/chart/LineChart";
import path from "path"
import CsvUploader from "@/components/import/CsvUploader"

export default function Home() {
  return (
    <>
      <h1>bow</h1>
      <CsvUploader />
      {/* <LineChart  /> */}
    </>
  );
}

export async function getServerSideProps() {
  // const dir = path.join(process.cwd(/), "/public")
  
  // console.log(jsonArray)
  return {
    props: {
    }, // will be passed to the page component as props
  };
}
