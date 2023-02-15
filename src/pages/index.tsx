import React from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  console.log("SESSION", session)
  return (
    <>
      <h1>Main Page</h1>
    </>
  );
}
