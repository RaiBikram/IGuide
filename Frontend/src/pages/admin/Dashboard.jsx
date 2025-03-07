import Sidebar from "@/components/Sidebar";
import React from "react";
// import { Outlet } from "react-router-dom";
import { GuideVerificationRequestReview } from "./GuideVerificationRequestsReview";
import Login from "../Login";
import { Logout } from "./Logout";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Outlet />
      {/* <Logout/> */}
    </div>
  );
}
