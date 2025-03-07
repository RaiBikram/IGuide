import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../API";
import { AuthContext } from "@/contextAPi/AuthContext";
import { Card, CardContent } from "./ui/card";
import BookGuideForm from "@/pages/BookGuideForm";

const GetVerifiedGuidesList = () => {
  const [verifiedGuides, setVerifiedGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [selectedGuideId, setSelectedGuideId] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchVerifiedGuides = async () => {
      setLoading(true);
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
        console.error("Error fetching verified guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedGuides();
  }, [token]);

  const handleBookClick = (guideId) => {
    setSelectedGuideId((prevSelectedGuideId) =>
      prevSelectedGuideId === guideId ? null : guideId
    );
  };

  return (
    <div className="w-full mx-auto p-4">
      {loading || !token ? (
        <p>Loading guides...</p>
      ) : (
        <div>
          {verifiedGuides.length === 0 ? (
            <p>No verified guides found.</p>
          ) : (
            <Card>
              <CardContent>
                <table className="table-auto w-full border border-gray-200 bg-white rounded-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Verification Date</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedGuides.map((guide, index) => (
                      <tr key={guide._id} className="border-t">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{guide.name}</td>
                        <td className="p-2">{guide.email}</td>
                        <td className="p-2">
                          {new Date(guide?.verificationDate)?.toLocaleDateString() || Date().now()}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleBookClick(guide._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md"
                          >
                            {/* {selectedGuideId === guide._id ? "Back" : "Book Guide"} */}
                            Active
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* {selectedGuideId && <BookGuideForm guideId={selectedGuideId} />} */}
    </div>
  );
};

export default GetVerifiedGuidesList;
