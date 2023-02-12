import LineChart from "@/components/chart/LineChart";
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
  

  return {
    props: {

    }, // will be passed to the page component as props
  };
}
