import React from "react";
import Image from "next/image";
import RedirectButton from "../button/RedirectButton";
import chartPhoto from "../../../public/chartPhoto.png";

type Props = {
  ActionName: string;
  redirect: string;
  children?: React.ReactNode;
  imgSrc: any;
};

export default function GoalSection({
  ActionName,
  redirect,
  children,
  imgSrc,
}: Props) {
  return (
    <div className="border-2 gray rounded w-96 h-96 flex flex-col">
      <div className="flex justify-center">
        <h1 className="font-serif text-black text-2xl">{ActionName}</h1>
      </div>

      <div className=" flex-grow w-96 h-full pt-4">
        <Image src={imgSrc} alt="" width={380} height={400} />
      </div>

      <small className="">{children}</small>

      <section className="mt-auto pt-4">
        <div className="flex justify-center pb-2">
          <RedirectButton
            onClick={() => console.log("clicked")}
            redirect={redirect}
          >
            Render Graph
          </RedirectButton>
        </div>
      </section>
    </div>
  );
}

// This graph allows you to select a year and materials, and shows a bar
// graph comparing the amount of each material consumed in each month of
// the year, allowing you to compare the usage of different materials
// against each other.
