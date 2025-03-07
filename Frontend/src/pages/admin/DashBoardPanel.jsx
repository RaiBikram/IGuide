import React, { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideUser, LucideUsers, LucideLogOut } from "lucide-react";
import { ApprovalConfirmGuide } from "../ApprovalConfirmGuide";
import GuidList from "../GuidList";
import { NormalUserComponents } from "./NormalUserComponents";
import { AuthContext } from "@/contextAPi/AuthContext";
import AdminBookingsTable from "./AdminBookingTable";

export const DashBoardPanel = () => {
    const [activeTab, setActiveTab] = useState("guideVerification"); // Default tab
    const { user, auth } = useContext(AuthContext);
    // Functions to change the active content
    const renderContent = () => {
        switch (activeTab) {
            case "guideVerification":
                return (
                    <ApprovalConfirmGuide />
                );
            case "verifiedGuides":
                return (
                    <GuidList />
                );
            case "users":
                return (
                    <NormalUserComponents />
                );
            case "assignedAdmins":
                return (
                    <div>
                        <h1 className="text-xl font-bold mb-4">Assigned Admins</h1>
                        <Card>
                            <CardContent>
                                <table className="table-auto w-full border border-gray-200 bg-white rounded-lg">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-2 text-left">#</th>
                                            <th className="p-2 text-left">Name</th>
                                            <th className="p-2 text-left">Email</th>
                                            <th className="p-2 text-left">Role</th>
                                            <th className="p-2 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-2 border-t">1</td>
                                            <td className="p-2 border-t">{auth?.name}</td>
                                            <td className="p-2 border-t">{auth?.email}</td>
                                            <td className="p-2 border-t">{auth?.role}</td>
                                            <td className="p-2 border-t">All</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                );
            case "adminBookingTable":
                return (
                    <AdminBookingsTable />
                );
            default:
                return <div>No content available.</div>;
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
                <div className="p-4 text-lg font-bold border-b border-gray-700">
                    iGuide Admin
                </div>
                <nav className="flex flex-col gap-2 mt-4 px-4">
                    <Button
                        variant="ghost"
                        className="justify-start text-left"
                        onClick={() => setActiveTab("guideVerification")}
                    >
                        <LucideUser className="mr-2" /> Guide Verification Request
                    </Button>
                    <Button
                        variant="ghost"
                        className="justify-start text-left"
                        onClick={() => setActiveTab("verifiedGuides")}
                    >
                        <LucideUsers className="mr-2" /> Verified Guides
                    </Button>
                    <Button
                        variant="ghost"
                        className="justify-start text-left"
                        onClick={() => setActiveTab("users")}
                    >
                        <LucideUsers className="mr-2" /> Users
                    </Button>
                    <Button
                        variant="ghost"
                        className="justify-start text-left"
                        onClick={() => setActiveTab("assignedAdmins")}
                    >
                        <LucideUsers className="mr-2" /> Assigned Admins
                    </Button>
                    {/* <Button variant="ghost" className="justify-start text-left text-red-500">
                        <LucideLogOut className="mr-2" /> Logout
                    </Button> */}
{/* 
                    <Button
                        variant="ghost"
                        className="justify-start text-left"
                        onClick={() => setActiveTab("adminBookingTable")}
                    >
                        <LucideUsers className="mr-2" /> Admin Booking Table
                    </Button> */}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 bg-gray-100 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

