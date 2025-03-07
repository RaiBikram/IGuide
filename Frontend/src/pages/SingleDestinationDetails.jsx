import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock } from "lucide-react";

import { Link } from "react-router-dom";

export const SingleDestinationDetails = ({
  name = "Destination Name",
  location = "Location",
  distance = "13 km Away",
  imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJXVVQdO2JBsB0Wh1nY_kVcxtkdGE27r9xA&s",
  description = "A beautiful destination with a rich cultural heritage and breathtaking landscapes.",
  bestTimeToVisit = "March to May",
  activities = ["Hiking", "Sightseeing", "Photography", "Local Tours"],
}) => {
  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 flex-row justify-center">
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="aspect-[4/3] overflow-hidden w-2/3 flex justify-center items-center ">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 ">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">{location}</span>
        </div>
      </div>

      {/* Destination Details Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section (Description and Best Time) */}
        <div >
          <h2 className="text-3xl font-semibold text-gray-900">{name}</h2>
          <p className="text-lg text-gray-600 mt-4">{description}</p>
          <div className="mt-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">Best Time to Visit:</span>
              <span>{bestTimeToVisit}</span>
            </div>
          </div>
        </div>

        {/* Right Section (Distance, Activities, and Booking) */}
        <div className="flex flex-col space-y-6">
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold">Distance</h3>
            <p className="text-lg">{distance}</p>
          </div>

          <div className="text-gray-700">
            <h3 className="text-xl font-semibold">Activities</h3>
            <ul className="list-disc ml-6 space-y-2">
              {activities.map((activity, index) => (
                <li key={index} className="text-lg">{activity}</li>
              ))}
            </ul>
          </div>

          <div>
           <Link to={"/guides"} >
           
           <Button className="w-full py-3 text-lg bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
             Find guide
            </Button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

