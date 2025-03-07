import { useState } from "react";
import { API } from "../../API";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(`/users/register`, {
        name,
        password,
        email,
      });

      if (response?.data?.success) {
        toast.success("You have successfully signed up");
        navigate("/login");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="w-full max-w-md shadow rounded-lg border p-8">
        <h1 className="text-xl text-center font-bold tracking-tight">
          Sign Up
        </h1>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              className="border rounded-lg w-full p-2.5 focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              className="border rounded-lg w-full p-2.5 focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              className="border rounded-lg w-full p-2.5 focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
