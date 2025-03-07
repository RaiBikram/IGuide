import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../API"; 
import { AuthContext } from "@/contextAPi/AuthContext";

const ApproveGuideRequest = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const handleApprove = async () => {
    setLoading(true);

    try {
      const response = await API.put(
        `/users/approve-guide-request/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const revokeGuidePermission = async () => {
    setLoading(true);

    try {
      const response = await API.put(
        `/users/revoke-guide-permission/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleApprove}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white font-medium transition ${
          loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Processing..." : "Approve"}
      </button>

      <button
        onClick={revokeGuidePermission}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white font-medium transition ${
          loading
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-800"
        }`}
      >
        {loading ? "Processing..." : "Revoke"}
      </button>
    </div>
  );
};

export default ApproveGuideRequest;
