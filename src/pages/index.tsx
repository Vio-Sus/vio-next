import GoalSection from "@/components/goal/GoalSection2";
import MaterialSelection from "../../public/materialSelection.png";
import Compare from "../../public/Compare.png";
import monthlyBreakdown from "../../public/monthlyBreakdown.png";
import monthCompare from "../../public/monthCompare.png";
import twoYears from "../../public/2years.png";

export default function Home() {
  return (
    <>
      <div className="">

        <div className="flex flex-wrap justify-evenly pt-6 mb-4 gap-8">

          <GoalSection
            redirect="/materialSelection"
            ActionName="Material Selection"
            imgSrc={MaterialSelection}
          >
            This graph allows you to select a year and materials, and shows a
            bar graph comparing the amount of each material consumed in each
            month of the year, allowing you to compare the usage of different
            materials against each other.
          </GoalSection>

          <GoalSection
            redirect="/compare"
            ActionName="Compare"
            imgSrc={Compare}
          >
            This graph allows you to select a material and two years, and shows
            a bar graph comparing the amount of the material consumed in each of
            those years
          </GoalSection>

          <GoalSection
            redirect="/materialSelectionForTwoYears"
            ActionName="Material Selection 2 Years"
            imgSrc={twoYears}
          >
            Our side-by-side graph comparison feature allows you to view two
            different years of material consumption data at once, making it easy
            to compare and contrast usage patterns. By selecting two years and a
            material, you can quickly see how consumption has changed over time
          </GoalSection>

          <GoalSection
            redirect="/monthlyBreakdown"
            ActionName="Monthly BreakDown"
            imgSrc={monthlyBreakdown}
          >
            This line graph compares the consumption of a single material over a
            two-year period. By selecting a material and two years, you can
            quickly identify changes in consumption patterns and make informed
            decisions about material management.
          </GoalSection>


          <GoalSection
            redirect="/monthCompare"
            ActionName="Monthly Compare"
            imgSrc={monthCompare}
          >
            This bar graph allows you to compare different materials during
            specific months in two different years. By selecting a material, a
            year, and a month, you can quickly identify consumption patterns and
            trends for the chosen time period.
          </GoalSection>

          <GoalSection
            redirect="/TwoSiteCompare"
            ActionName="Compare between different sites"
            imgSrc={monthCompare}
          >
            This bar graph allows you to compare different materials during
            specific months in two different years. By selecting a material, a
            year, and a month, you can quickly identify consumption patterns and
            trends for the chosen time period.
          </GoalSection>
        </div>
      </div>
    </>
  );
}

// import React from "react";
// import RedirectButton from "../components/button/RedirectButton";
// import GoalSection from "@/components/goal/GoalSection";
// import MaterialSelection from "../../public/materialSelection.png";
// import Compare from "../../public/Compare.png";
// import monthlyBreakdown from "../../public/monthlyBreakdown.png";
// import monthCompare from "../../public/monthCompare.png";
// import twoYears from "../../public/2years.png";

// export default function Home() {
//   return (
//     <>
//       <div className="flex flex-wrap justify-center gap-8 pt-12 mb-4">
//         <div className="grid grid-cols-3 gap-8">
//           <GoalSection
//             redirect="/materialSelection"
//             ActionName="Material Selection"
//             imgSrc={MaterialSelection}
//           >
//             This graph allows you to select a year and materials, and shows a
//             bar graph comparing the amount of each material consumed in each
//             month of the year, allowing you to compare the usage of different
//             materials against each other.
//           </GoalSection>

//           <GoalSection
//             redirect="/compare"
//             ActionName="Compare"
//             imgSrc={Compare}
//           >
//             This graph allows you to select a material and two years, and shows
//             a bar graph comparing the amount of the material consumed in each of
//             those years
//           </GoalSection>

//           <GoalSection
//             redirect="/materialSelectionForTwoYears"
//             ActionName="Material Selection 2 Years"
//             imgSrc={twoYears}
//           >
//             Our side-by-side graph comparison feature allows you to view two
//             different years of material consumption data at once, making it easy
//             to compare and contrast usage patterns. By selecting two years and a
//             material, you can quickly see how consumption has changed over time
//           </GoalSection>
//         </div>

//         <div className="grid grid-cols-3 gap-8">
//           <GoalSection
//             redirect="/monthlyBreakdown"
//             ActionName="Monthly BreakDown"
//             imgSrc={monthlyBreakdown}
//           >
//             This line graph compares the consumption of a single material over a
//             two-year period. By selecting a material and two years, you can
//             quickly identify changes in consumption patterns and make informed
//             decisions about material management.
//           </GoalSection>

//           <GoalSection
//             redirect="/monthCompare"
//             ActionName="Monthly Compare"
//             imgSrc={monthCompare}
//           >
//             This bar graph allows you to compare different materials during
//             specific months in two different years. By selecting a material, a
//             year, and a month, you can quickly identify consumption patterns and
//             trends for the chosen time period.
//           </GoalSection>

//           <GoalSection
//             redirect="/TwoSiteCompare"
//             ActionName="Compare between different sites"
//             imgSrc={monthCompare}
//           >
//             This bar graph allows you to compare different materials during
//             specific months in two different years. By selecting a material, a
//             year, and a month, you can quickly identify consumption patterns and
//             trends for the chosen time period.
//           </GoalSection>
//         </div>
//       </div>
//     </>
//   );
// }
