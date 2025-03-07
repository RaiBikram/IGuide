import { AuthContext } from "@/contextAPi/AuthContext";
import { API } from "../../API";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", { email, password });

      if (response?.data?.success) {
        const userData = response?.data?.user;
        if (!userData) return;

        const tokenData = userData.token;
        // console.log("Token received: ", tokenData);

        // Store token in localStorage
        localStorage.setItem("token", tokenData);

        // Update the context state with the token
        setToken(tokenData);
        // Store userData as a JSON string in localStorage
        localStorage.setItem("auth", JSON.stringify(userData));

        // Store token separately as a plain string
        // localStorage.setItem("token", tokenData);

        // // Update state
        setAuth(userData);
        // setToken(tokenData);

        toast.success(response.data.message);

        setEmail("");
        setPassword("");

        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="w-full max-w-md shadow rounded-lg border p-8">
        <h1 className="text-xl text-center font-bold tracking-tight">Log in</h1>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg w-full p-2.5 focus:ring-2 focus:ring-blue-500"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="border rounded-lg w-full p-2.5 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Log in
          </button>
          <p className="text-sm text-center">
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
