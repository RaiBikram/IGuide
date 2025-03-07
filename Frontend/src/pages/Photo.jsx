import {stables} from "@/constant/stables";

import React from "react";
const imageURI ="1734104259794-GeDYLhLWMAAJ6uq.jpg";
export const Photo = ({ imageURI }) => {
  // const UPLOAD_FOLDER_BASE_URL = "http://localhost:5000/uploads/";

  const imageURL = "1734104259794-GeDYLhLWMAAJ6uq.jpg";
  return (
    <div>
      <div className="group flex flex-col gap-y-2 p-4 border-2 border-gray-300 hover:border-orange-400 transition-all duration-300 rounded-2xl shadow-lg">
        <img
          src={`${stables.UPLOAD_FOLDER_BASE_URL}${imageURL}`}
          alt="Uploaded content"
          className="w-full h-auto object-cover rounded-md transition-transform duration-300"
        />
      </div>
    </div>
  );
};
