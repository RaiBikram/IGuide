import { AuthContext } from "@/contextAPi/AuthContext";

import Unauthorised from "@/pages/Unauthorised";

import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


export default function AuthProtectedRoute() {
  const { user,auth } = useContext(AuthContext);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // console.log(user)
    if (auth?.role === "admin") {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth]); 

  return ok ? <Outlet /> : <Unauthorised />;
}
