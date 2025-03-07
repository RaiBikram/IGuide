import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBaLinsOaUhap_vidOsea1iUfgtGoRsbSw",
//   authDomain: "saha-yatri-d87a7.firebaseapp.com",
//   projectId: "saha-yatri-d87a7",
//   storageBucket: "saha-yatri-d87a7.appspot.com",
//   databaseURL: "https://saha-yatri-d87a7.firebaseio.com",
//   appId: "1:432369063180:android:e7511b952d754fd0f32529",
//   messagingSenderId: "432369063180",
// };

// // Initialize Firebase and Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const Admins = () => {
  const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const userCollectionRef = collection(db, "users");
//         const querySnapshot = await getDocs(userCollectionRef);
//         const adminsData = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter((user) => user.user === "admin"); 

//         setAdmins(adminsData);
//       } catch (error) {
//         console.error("Error fetching users: ", error);
//       }
//     };

//     fetchAdmins();
//   }, []);

  return (
 <AdminLayout>
     <div className="p-6 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Admins</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left font-semibold text-gray-600">#</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Name</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Email</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              {/* <td className="px-4 py-2">{admin.username}</td> */}
              <td className="px-4 py-2">{admin.email}</td>
              <td className="px-4 py-2">{admin.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 </AdminLayout>
  );
};

export default Admins;
