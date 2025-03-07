import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
    
        <Outlet />
 
    </div>
  );
}
