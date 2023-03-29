import React from "react";
import RedirectButton from "../components/button/RedirectButton";

export default function Home() {

  return (
    <>

    <h1
    className="text-1xl font-bold text-[#000] mt-8"
    >Available actions / graphs</h1>
  
      <RedirectButton
        onClick={() => console.log("clicked")}
        redirect="/materialSelection"
      >
        Material Selection
      </RedirectButton>

      <RedirectButton
        onClick={() => console.log("clicked")}
        redirect="/compare"
      >
        Compare
      </RedirectButton>

      <RedirectButton
        onClick={() => console.log("clicked")}
        redirect="/materialSelectionForTwoyears"
      >
        Select & Compare Material for 2 years
      </RedirectButton>

      <RedirectButton
        onClick={() => console.log("clicked")}
        redirect="/monthlyBreakdown"
      >
        Monthly Breakdown
      </RedirectButton>
    </>
  );
}
