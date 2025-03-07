import { Plane, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="absolute -z-10 bottom-0 left-0 w-3/4 h-3/4 bg-blue-50 rounded-full" />
            <img
              src="/choose.png"
              alt="Tourists exploring Nepal"
              className="relative z-10 rounded-2xl"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600">
                Enjoy different experiences in every place you visit and discover new and affordable adventures of course.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100">
                    <Plane className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Verified Guides
                  </h3>
                  <p className="text-gray-600">
                    All of our guides are legally verified
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Personalized guides, one-on-one chat!
                  </h3>
                  <p className="text-gray-600">
                    Get personalized guides and chat one-on-one with experts!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Trusted & Reliable
                  </h3>
                  <p className="text-gray-600">
                    Your Journey, Our Connection
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
           <Link to={"/guides"}>
           <Button size="lg" className="mt-6">
              Book Your Guide
              <span className="ml-2">→</span>
            </Button>
           </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;