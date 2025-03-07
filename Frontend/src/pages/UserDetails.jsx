import { API } from "../../API";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contextAPi/AuthContext";
import { Button } from "@/components/ui/button";
import UploadProfilePicture from "@/components/UploadProfilePicture";
// import UploadUserDocuments from "@/components/UploadUserDocuments";
// import BecomeAGuidRequest from "@/components/BecomeAGuidRequest";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { stables } from "@/constant/stables";
import { Link } from "react-router-dom";
import { Booked } from "@/components/Booked";

export default function UserDetails() {
  const { user, setUser, token ,auth} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  // const [showBecomeGuide, setShowBecomeGuide] = useState(false);
  const [waitingForToken, setWaitingForToken] = useState(true);

  useEffect(() => {
    const lastToken = token || localStorage.getItem("token");
    if (!lastToken) {
      setWaitingForToken(false);
      return;
    }

    setWaitingForToken(false);

    const getUserProfileData = async () => {
      setLoading(true);
      try {
        const response = await API.get("/users/profile", {
          headers: { Authorization: `Bearer ${lastToken}` },
        });

        if (response?.data?.success) {
          setUser(response?.data);
        } else {
          console.error("Failed to fetch user data:", response?.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfileData();
  }, [token]);

  return (
    <div className="flex flex-col items-center pt-32 w-full">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
        {/* Profile Avatar */}
        <div className="flex justify-center p-3 w-full">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={`${stables.UPLOAD_FOLDER_BASE_URL}${user?.profile}`}
              className="w-full h-full object-cover rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          {user?.name || "User"}
        </h1>
        <div className="grid gap-2 text-gray-700 text-start ms-10">
          <p>
            <span className="font-semibold">ID:</span>{" "}
            {user?._id || user?.userId}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
          <p>
            <span className="font-semibold">Verified:</span>{" "}
            {user?.verified ? "Yes" : "No"}
          </p>
        </div>

        {/* Loading States */}
        {waitingForToken && (
          <p className="text-center text-gray-600">Waiting for token...</p>
        )}
        {loading && (
          <p className="text-center text-gray-600">Loading user data...</p>
        )}
        {!loading && !user && (
          <p className="text-center text-red-600">Failed to load user data.</p>
        )}

        {/* Actions */}
        <div className="space-y-6 mt-6 ms-10">
          {/* Upload Profile Picture */}
          <div>
            <Button
              className="text-green-500 hover:bg-slate-600 hover:text-white bg-white outline "
              onClick={() => setShowProfileUpload(!showProfileUpload)}
            >
              {showProfileUpload ? "Back" : "Upload Profile Picture"}
            </Button>
            {showProfileUpload && (
              <div className="mt-4">
                <UploadProfilePicture />
              </div>
            )}
          </div>

          {/* Become a Guide Section */}
          {user?.role === "normal" && (
            <div>
              <Link to={`/become-guide/${user?._id}`}>
                <Button className="text-green-500 hover:bg-slate-600 hover:text-white bg-white outline ">
                  Become a guide
                </Button>
              </Link>
              {/* <Button
                className="text-green-500 hover:bg-slate-600 hover:text-white bg-white outline "
                onClick={() => setShowBecomeGuide(!showBecomeGuide)}
              >
                {showBecomeGuide ? "Back" : "Become a Guide"}
              </Button>
              {showBecomeGuide && (
                <div className="mt-6 space-y-4">
                  <UploadUserDocuments Token={token} />
                  <BecomeAGuidRequest userId={user?._id} />
                </div>
              )} */}
            </div>
          )}
        </div>
        <Booked />
      </div>
    </div>
  );
}
