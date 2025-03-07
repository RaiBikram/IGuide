import { toast } from "react-toastify";



export const Logout = () => {
  if (window.confirm("Do you really want to logout?")) {
    localStorage.clear();
    toast.success("Logged out!");
    window.location.href = "/login";
  }
};
