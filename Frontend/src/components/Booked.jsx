import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contextAPi/AuthContext";
import { API } from "../../API";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Booked = () => {
  const [bookedData, setBookedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.id) {
        console.log("Auth ID is missing, skipping fetch.");
        setLoading(false);
        return;
      }

      console.log("Fetching data for user ID:", auth.id);

      try {
        const response = await API.post("/users/get-guide-or-tourist", {
          userId: auth.id,
        });

        console.log("API Response:", response.data);

        const { guide, tourists } = response.data;

        if (guide && guide._id !== auth.id) {
          setBookedData({ type: "Guide", data: guide });
        } else if (tourists && tourists.length > 0) {
          const filteredTourists = tourists.filter((t) => t._id !== auth.id);

          if (filteredTourists.length > 0) {
            setBookedData({ type: "Tourists", data: filteredTourists });
          } else {
            setBookedData(null);
          }
        } else {
          setBookedData(null);
        }
      } catch (error) {
        console.error("Error fetching booked users and guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth?.id]);

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : bookedData ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Related {bookedData.type}
          </h3>
          <div className="grid gap-4">
            {bookedData.type === "Guide" ? (
              <GuideCard guide={bookedData.data} />
            ) : (
              bookedData.data.map((tourist) => (
                <TouristCard key={tourist._id} tourist={tourist} />
              ))
            )}
          </div>
        </div>
      ) : (
        <p>No valid data available.</p>
      )}
    </div>
  );
};

// Guide Card Component
const GuideCard = ({ guide }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={guide.profilePicture} alt={guide.name} />
        </Avatar>
        <CardTitle className="text-lg">{guide.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          <strong>Email:</strong> {guide.email}
        </p>
        <p className="text-gray-600">
          <strong>Role:</strong> {guide.role}
        </p>
        <p className="text-gray-600">
          <strong>Address:</strong> {guide.address}
        </p>
        <p className="text-gray-600">
          <strong>Languages:</strong> {guide.language.join(", ")}
        </p>
        <p className="text-gray-600">
          <strong>Hourly Rate:</strong> ${guide.perHourRate}/hr
        </p>
        <p className="text-gray-600">
          <strong>About:</strong> {guide.about}
        </p>
      </CardContent>
    </Card>
  );
};

// Tourist Card Component
const TouristCard = ({ tourist }) => {
  return (
    <Card key={tourist._id} className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{tourist.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          <strong>Email:</strong> {tourist.email}
        </p>
        <p className="text-gray-600">
          <strong>Role:</strong> {tourist.role}
        </p>
        {tourist.reservation.length > 0 && (
          <div className="mt-2">
            <strong>Reservation Details:</strong>
            {tourist.reservation.map((res, index) => (
              <div key={index} className="mt-2 p-2 border rounded">
                <p>
                  <strong>Location:</strong> {res.location}
                </p>
                <p>
                  <strong>Time Period:</strong> {res.timePeriod}
                </p>
                <p>
                  <strong>People:</strong> {res.people}
                </p>
                <p>
                  <strong>Cost:</strong> ${res.cost.TotalConst}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};