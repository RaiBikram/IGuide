import React, { useContext, useState } from "react";
import { API } from "../../API";
import { AuthContext } from "@/contextAPi/AuthContext";
import { toast } from "react-toastify";

export default function UploadProfilePicture() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth, token } = useContext(AuthContext);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      const response = await API.post("users/upload-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFile("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 ">
      {/* <h2 className="text-lg font-semibold text-gray-800 mb-3">Upload Profile Picture</h2> */}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="fileInput" className="text-gray-700 font-medium">
            Choose a Profile Picture
          </label>
          <input
            type="file"
            id="fileInput"
            name="profilePicture"
            onChange={handleFileChange}
            className="border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg text-white font-semibold transition-all 
            disabled:cursor-not-allowed disabled:bg-gray-400 
            bg-yellow-500 hover:bg-yellow-600"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
