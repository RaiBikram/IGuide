import { useContext, useEffect, useState } from "react";
import {
  Map,
  Languages,
  Star,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircleMore
} from "lucide-react";
import { stables } from "@/constant/stables";
import { Link, useParams } from "react-router-dom";
import { API } from "../../API";
import { AuthContext } from "@/contextAPi/AuthContext";
import { NavLink } from "react-router-dom";

const GuideProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { token } = useContext(AuthContext);
  const [guideData, setGuideData] = useState({});
  const { guideId } = useParams();

  useEffect(() => {
    const getSingleGuideDetails = async () => {
      try {
        if (!token) return;
        const response = await API.get(`/users/get-single-guide/${guideId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.data.success) {
          setGuideData(response?.data?.guide);
        }
      } catch (error) {
        console.error("Error fetching guide details:", error);
      }
    };

    getSingleGuideDetails();
  }, [token]);

  const stats = [
    {
      label: "Tours Completed",
      value: "156",
      icon: <Map className="w-5 h-5" />,
    },
    {
      label: "Years Experience",
      value: "8",
      icon: <Calendar className="w-5 h-5" />,
    },
    { label: "Languages", value: "4", icon: <Languages className="w-5 h-5" /> },
  ];

  const languages = ["English", "Spanish", "French", "Italian"];

  //   const specialties = [
  //     'Historical Tours',
  //     'Cultural Experiences',
  //     'Food & Wine Tours',
  //     'Photography Tours'
  //   ];

  const upcomingTours = [
    {
      name: "Historic City Center Walk",
      date: "Mar 15, 2025",
      spots: "3 spots left",
    },
    {
      name: "Local Food Discovery",
      date: "Mar 18, 2025",
      spots: "5 spots left",
    },
    {
      name: "Cultural Heritage Tour",
      date: "Mar 20, 2025",
      spots: "2 spots left",
    },
  ];
  // Extract all properties and store them in variables
  const _id = guideData?._id;
  const name = guideData?.name;
  const email = guideData?.email;
  const role = guideData?.role;
  const verified = guideData?.verified;
  const becomeAGuide = guideData?.becomeAGuide;
  const contact = guideData?.contact || 9800000000;
  // const languages = guideData?.language || [
  //   "English",
  //   "Spanish",
  //   "French",
  //   "Italian",
  // ];
  const reservationRequest = guideData?.reservationRequest;
  const reservationStatus = guideData?.reservationStatus;
  const documents = guideData?.documents;
  const reservation = guideData?.reservation;
  const createdAt = guideData?.createdAt;
  const updatedAt = guideData?.updatedAt;
  const imageURL = guideData?.profilePicture;
  const __v = guideData?.__v;
  const address = guideData?.address || "kathmandu, Nepal";
  const about = guideData?.about || "Professional tour guide with 8 years of experience showing visitors the hidden gems and major attractions of Rome.Specialized in historical and cultural tours, with extensiveknowledge of Roman art, architecture, and local customs."
  // response

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Guide Info */}
        <div className="md:w-1/3">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                <span className="text-2xl font-semibold text-gray-400">
                  <img
                    src={`${stables.UPLOAD_FOLDER_BASE_URL}${imageURL}`}
                    alt="Uploaded content"
                    className="w-full h-auto object-cover rounded-md transition-transform duration-300"
                  />
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600 mb-2">Professional Tour Guide</p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
              <span className="text-gray-600 ml-2">(4.9)</span>
            </div>

            <div className="flex justify-center items-center gap-3 mb-6">
              <Link to={`/book-guide/${guideId}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Book a Guide
                </button>
              </Link>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Contact
              </button>
              <div>
                <NavLink to="/message-chat">
                  <MessageCircleMore
                    className="h-12 w-12 p-2 text-blue-500 hover:bg-blue-50 rounded-xl"
                  />
                </NavLink>
              </div>

            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{contact}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Globe className="w-5 h-5" />
              <span>Licensed Guide #12345</span>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Content */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-center text-gray-800">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-center text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              {["Overview", "Tours", "Reviews", "Availability"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-4 px-2 ${activeTab === tab.toLowerCase()
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {/* About Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                About Me
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {about}
              </p>
            </div>

            {/* Languages */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-gray-600 text-sm border border-gray-200"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Upcoming Tours */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Upcoming Tours
              </h3>
              <div className="space-y-3">
                {upcomingTours.map((tour, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800">{tour.name}</h4>
                      <p className="text-sm text-gray-600">{tour.date}</p>
                    </div>
                    <span className="text-sm text-blue-600">{tour.spots}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
