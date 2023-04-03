import React from "react";
import RedirectButton from "../components/button/RedirectButton";
import ButtonClickChange from "@/components/button/ButtonColorChange"
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
        redirect="/Monthly Breakdown"
      >
        Monthly Breakdown
      </RedirectButton>

      <RedirectButton
        onClick={() => console.log("clicked")}
        redirect="/monthCompare"
      >
        Monthly Compare
      </RedirectButton>

      <ButtonClickChange text="Material Selection" link="/materialSelection"/>
      <ButtonClickChange text="Compare" link="/compare"/>
      <ButtonClickChange text="Select & Compare Material for 2 years" link="/materialSelectionForTwoyears"/>
      <ButtonClickChange text="Monthly Breakdown" link="/Monthly Breakdown"/>
      <ButtonClickChange text="Monthly Compare" link="/monthCompare"/>
      

    </>
  );
}
