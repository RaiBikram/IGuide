import React, { useContext, useState } from "react";
import { API } from "../../API";
import { AuthContext } from "@/contextAPi/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function UploadUserDocuments() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, setToken, setUser } = useContext(AuthContext);
const navigate = useNavigate();
  const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB limit

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > 3) {
      toast.error("You can only upload up to 3 files.");
      return;
    }

    for (let file of selectedFiles) {
      if (!allowedFileTypes.includes(file.type)) {
        toast.error("Only PDF, JPG, and PNG files are allowed.");
        return;
      }
      if (file.size > maxFileSize) {
        toast.error("File size must be less than 5 MB.");
        return;
      }
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("userDocuments", file));

    try {
      setLoading(true);
      const response = await API.post(
        "/users/upload-user-documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 200 && response?.data?.token) {
        // console.log("document send " , response.data);
        toast.success("Documents uploaded successfully!");
        localStorage.setItem("token", response?.data?.token);
        setToken(response?.data?.token);
        setUser(null);
        setFiles([]);
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return (
    <div className="p-10 flex text-center flex-col justify-center items-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Upload Documents</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-1/3 ">
        {/* File Input */}
        <div>
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Documents (up to 3)
          </label>
          <input
            type="file"
            id="fileInput"
            name="userDocuments"
            multiple
            onChange={handleFileChange}
            className="mt-2 w-full px-3 py-2 border rounded-lg text-sm text-gray-700 bg-gray-100"
            disabled={loading} // Disable input during file upload
          />
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700">
              Selected Files:
            </h3>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={clearFiles}
              className="text-sm text-red-600 hover:underline mt-2"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
