import GuideCard from "@/components/GuideCard";
import { AuthContext } from "@/contextAPi/AuthContext";
import { API } from "../../API";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Guides = () => {
  const [verifiedGuides, setVerifiedGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTourType, setSelectedTourType] = useState("");

  const { token } = useContext(AuthContext);

  // Sample filter options - replace with your actual options
  const experienceLevels = [
    "0-2 years",
    "2-5 years",
    "5-10 years",
    "10+ years",
  ];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Mandarin",
  ];
  const tourTypes = [
    "Adventure",
    "Cultural",
    "Historical",
    "Nature",
    "City",
    "Food & Wine",
  ];

  //  const handleSearchChange = (e) => {
  //    setSearchTerm(e.target.value);
  //    onFilterChange({
  //      search: e.target.value,
  //      experience: selectedExperience,
  //      language: selectedLanguage,
  //      tourType: selectedTourType
  //    });
  //  };

  const handleFilterChange = (type, value) => {
    switch (type) {
      case "experience":
        setSelectedExperience(value);
        break;
      case "language":
        setSelectedLanguage(value);
        break;
      case "tourType":
        setSelectedTourType(value);
        break;
    }

    onFilterChange({
      search: searchTerm,
      experience: type === "experience" ? value : selectedExperience,
      language: type === "language" ? value : selectedLanguage,
      tourType: type === "tourType" ? value : selectedTourType,
    });
  };

  useEffect(() => {
    if (!token) return; // Avoid fetching if no token

    const fetchVerifiedGuides = async () => {
      try {
        const response = await API.get("/users/get-verified-guides", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.status === 200) {
          setVerifiedGuides(response?.data?.verifiedGuides || []);
        } else {
          toast.error("Failed to load verified guides.");
        }
      } catch (error) {
        toast.error("Error fetching verified guides!");
        console.error(
          "Error fetching verified guides:",
          error?.response || error
        );
      }
    };

    fetchVerifiedGuides();
  }, [token]);

  return (
    <div className="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
        Our Professional & Experienced Guides
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore the world’s most amazing destinations. Find your next adventure
        today!
      </p>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Experience Dropdown */}
          <select
            value={selectedExperience}
            onChange={(e) => handleFilterChange("experience", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Experience Level</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {/* Languages Dropdown */}
          <select
            value={selectedLanguage}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Language</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>

          {/* Tour Type Dropdown */}
          <select
            value={selectedTourType}
            onChange={(e) => handleFilterChange("tourType", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tour Type</option>
            {tourTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <Button className="bg-blue-500 hover:bg-orange-500">Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedGuides.length > 0 ? (
          verifiedGuides.map((guide, index) => (
            <GuideCard
              key={guide?._id || index} // Use unique ID when available
              guideId={guide?._id}
              name={guide?.name}
              address={guide?.address}
              rating={guide?.rating}
              experience={guide?.experience}
              languages={guide?.languages}
              perHourRate={guide?.perHourRate}
              specialties={guide?.specialties}
              imageUrl={guide?.profilePicture}
              guides={verifiedGuides}
              status={guide?.reservationStatus}
            />
          ))
        ) : !token ? (
          <p className="text-center text-gray-500">
            Please log in to view verified guides.
          </p>
        ) : (
          [...Array(6)].map((_, index) => <GuideCard key={index} />)
        )}
      </div>
    </div>
  );
};

export default Guides;
