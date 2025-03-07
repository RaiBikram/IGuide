import { useState, useEffect } from "react";
// import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBaLinsOaUhap_vidOsea1iUfgtGoRsbSw",
//   authDomain: "saha-yatri-d87a7.firebaseapp.com",
//   projectId: "saha-yatri-d87a7",
//   storageBucket: "saha-yatri-d87a7.appspot.com",
//   databaseURL: "https://saha-yatri-d87a7.firebaseio.com",
//   appId: "1:432369063180:android:e7511b952d754fd0f32529",
//   messagingSenderId: "432369063180",
// };

// Initialize Firebase and Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export const GuideVerificationRequestReview = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const userCollectionRef = collection(db, "users");
  //       const querySnapshot = await getDocs(userCollectionRef);

  //       const usersData = querySnapshot.docs
  //         .map((doc) => {
  //           const data = doc.data();
  //           return {
  //             id: doc.id,
  //             ...data,
  //           };
  //         })
  //         .filter((user) => user.user === "user" && user.yearOfExp);

  //       setUsers(usersData);
  //     } catch (error) {
  //       console.error("Error fetching users: ", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // const grantGuideRole = async (userId) => {
  //   try {
  //     const userDocRef = doc(db, "users", userId);
  //     await updateDoc(userDocRef, { user: "guide" });

  //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  //     alert("User role updated to guide!");
  //   } catch (error) {
  //     console.error("Error updating user role: ", error);
  //   }
  // };

  // const holdGuideRole = async (userId) => {
  //   if (window.confirm("Do you really want to put this user on hold?")) {
  //     try {
  //       const userDocRef = doc(db, "users", userId);
  //       await updateDoc(userDocRef, { user: "onHold" });

  //       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  //       alert("User role on hold!");
  //     } catch (error) {
  //       console.error("Error updating user role: ", error);
  //     }
  //   }
  // };

  return (

    <div>

      {/* <AdminLayout> */}

      <section className=" flex flex-wrap  bg-white shadow-lg rounded-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Guide Verification Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-300 text-white">
                <th className="px-6 py-3 text-gray-800 text-left font-medium">
                  #
                </th>
                <th className="px-6 py-3 text-gray-800 text-left font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-gray-800 text-left font-medium">
                  Documents
                </th>
                <th className="px-6 py-3 text-gray-800 text-left font-medium">
                  Email
                </th>
                <th className="px-6 py-3 text-gray-800 text-left font-medium">
                  Role
                </th>
                <th className="px-6 py-3 text-gray-800 text-left font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">{user.username}</td>
                      <td className="px-6 py-4 text-blue-500 cursor-pointer">
                        Document Link
                      </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-gray-700">{user.user}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                      // onClick={() => grantGuideRole(user.id)}
                      >
                        Grant
                      </button>
                      <button
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      // onClick={() => holdGuideRole(user.id)}
                      >
                        Hold
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* </AdminLayout> */}

    </div>
  );
};


