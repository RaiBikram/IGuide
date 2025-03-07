

import GetVerifiedGuidesList from "@/components/GetVerifiedGuidList";
import React from "react";

export default function GuidList() {
  return (
    <div>
      <div className=" flex flex-wrap justify-center items-center ">
        <h1 className="text-4xl font-semibold w-full">Choose your Guides</h1>
 

        <div className="w-full pt-5">
          <GetVerifiedGuidesList />
        </div>
      </div>
      ;
    </div>
  );
}
