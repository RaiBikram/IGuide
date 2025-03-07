import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contextAPi/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { token } = useContext(AuthContext);
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center min-h-screen gap-8 py-16">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Get instant professional guidance and explore the beauty of{" "}
            <span className="text-blue-600">Nepal</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Plan and book your perfect journey with iGuide! Get personalized
            guides, expert advice, travel tips, and destination insights—all in
            one place!
          </p>
          {!token && (
            <div className="pt-4">
              <Button className="text-lg px-8 py-6  transition-colors duration-300">
                <Link to="/login">Join Us</Link>
              </Button>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <img
            src="/hero.png"
            alt="Nepal Tourism"
            className="relative w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
