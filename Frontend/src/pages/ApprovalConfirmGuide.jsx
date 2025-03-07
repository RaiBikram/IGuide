import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../API"; // Adjust the import path if needed
import ApproveGuideRequest from "@/components/ApproveGuideRequest";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

export const ApprovalConfirmGuide = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/users/get-all-users");
        if (response?.status === 200) {
          setUsers(response?.data?.users || []);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        toast.error("Error fetching users!");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto p-4 text-center">
        <p className="text-lg font-medium text-gray-700">Loading users...</p>
      </div>
    );
  }

  const guideRequests = users.filter((user) => user.role !== "guide" && user.becomeAGuide);

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Guide Verification Requests</h1>
      {guideRequests.length === 0 ? (
        <Card className="bg-white shadow-lg rounded-lg p-6">
          <CardContent>
            <p className="text-center text-gray-500 text-lg">No pending requests</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white shadow-lg rounded-lg">
          <CardContent>
            <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4 text-left text-sm font-medium">#</th>
                  <th className="p-4 text-left text-sm font-medium">Name</th>
                  <th className="p-4 text-left text-sm font-medium">Documents</th>
                  <th className="p-4 text-left text-sm font-medium">Email</th>
                  <th className="p-4 text-left text-sm font-medium">Role</th>
                  <th className="p-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guideRequests.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-100 border-b transition">
                    <td className="p-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-4 text-sm text-gray-700">{user.name}</td>
                    <td className="p-4 text-sm text-blue-500">
                      <NavLink to="/view-documents" className="underline">
                        View Documents
                      </NavLink>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{user.email}</td>
                    <td className="p-4 text-sm text-gray-700 capitalize">{user.role}</td>
                    <td className="p-4">
                      <ApproveGuideRequest userId={user._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
