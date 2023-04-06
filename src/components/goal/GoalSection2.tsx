import React from "react";
import Image from "next/image";
import RedirectButton from "../button/RedirectButton";
import chartPhoto from "../../../public/chartPhoto.png";
import ButtonColorChange from "@/components/button/ButtonColorChange";
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
    <div className="flex justify-center">
      <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-500">
        <a href="#!" data-te-ripple-init data-te-ripple-color="light">
          {/* <img
        className="rounded-t-lg"
        src={imgSrc}
        alt="" /> */}
          <Image
            className="rounded-t-lg w-full"
            src={imgSrc}
            alt=""
            width={380}
            height={400}
          />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {ActionName}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {children}
          </p>
          <ButtonColorChange link={redirect} text="Render Graph" />
        </div>
      </div>
    </div>
  );
}

// This graph allows you to select a year and materials, and shows a bar
// graph comparing the amount of each material consumed in each month of
// the year, allowing you to compare the usage of different materials
// against each other.
