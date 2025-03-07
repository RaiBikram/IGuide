import { AuthContext } from "@/contextAPi/AuthContext";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API } from "../../API";

export default function BecomeAGuidRequest() {
  const { token } = useContext(AuthContext); // Only use token as `auth` wasn't used
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleButton = async () => {
    setLoading(true);
    try {
      const response = await API.post(
        "/users/guide-request",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred while submitting your request."
      );
      console.error("Error submitting request:", error); // Log error for easier debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* <h2 className="text-lg font-semibold text-gray-800 mb-3">Become a Guide</h2> */}

      <button
        className="w-2/3 py-2 px-4 rounded-lg text-white font-semibold transition-all 
          disabled:cursor-not-allowed disabled:bg-gray-400 
          bg-yellow-500 hover:bg-yellow-600"
        onClick={handleButton}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Request Guide Approval"}
      </button>
    </div>
  );
}
