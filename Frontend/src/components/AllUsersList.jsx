import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../API"; // Adjust the import path to match your project
import { AuthContext } from "@/contextAPi/AuthContext";

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
const {token}=useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/users/get-all-users",   {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); // Adjust this path to your API route
        if (response.status === 200) {
          setUsers(response.data.users); // Assuming the response structure includes the 'users' array
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
  }, []); // Empty dependency array to run only once when the component is mounted

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-amber-100 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user?._id} className="border-b pb-4">
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <p>Role: {user?.role}</p>
              <p>Email: {user?.email}</p>
              <p>City: {user?.city}</p>
              {user?.role !== "guide" && user?.becomeAGuide && (
                <p>becomeAGuide : True</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsersList;
