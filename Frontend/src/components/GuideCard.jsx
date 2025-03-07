import { Star, Clock, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { stables } from "@/constant/stables";

const GuideCard = ({
  guideId,
  name = "John Smith",
  address = "Kathmandu, Nepal",
  rating = 4.8,
  experience = "5+ years",
  languages = ["English", "Nepali"],
  perHourRate = "5",
  specialties = ["Heritage Sites", "Mountain Trails"],
  imageUrl,
  status = "Available", // Added status as a prop for flexibility
  // guides
}) => {
  const imageURI = imageUrl
    ? `${stables.UPLOAD_FOLDER_BASE_URL}${imageUrl}`
    : "https://www.nepaltrekhub.com/wp-content/uploads/2019/12/sarala-nepal.jpg";
  // console.log(guides)
  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
      <Link to={`/guide-profile/${guideId}`} className="block">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={imageURI}
              alt={`Guide ${name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {rating}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-4">
        <div>
          <Link to={`/guide-profile/${guideId}`} className="hover:underline">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <b className="text-base">Status:</b>
            <span
              className={`text-sm font-semibold px-2 py-1 rounded-full ${
                status ? "text-white bg-green-800" : "text-white bg-red-600"
              }`}
            >
              {status ? "Unavailable" : "Available"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{address}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{languages.join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <p className="text-lg font-semibold text-gray-900">
              ${perHourRate}
              <span className="text-sm text-gray-500">/day</span>
            </p>
          </div>

          <Link to={`/guide-profile/${guideId}`}>
            <Button>View Guide</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
