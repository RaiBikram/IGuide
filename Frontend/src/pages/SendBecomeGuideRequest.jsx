import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../API";
import { toast } from "react-toastify";
import { AuthContext } from "@/contextAPi/AuthContext";

export const SendBecomeGuideRequest = ({ perHourRateF }) => {
  const { guideId } = useParams();
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: "",
    address: "",
    about: "",
    language: "",
    perHourRate: "",
    guideId: "", // Ensure guideId is part of the state
  });

  const [errors, setErrors] = useState({
    contact: "",
    address: "",
    about: "",
    language: "",
    perHourRate: "",
  });

  // If guideId exists, add it to formData
  useEffect(() => {
    if (guideId) {
      setFormData((prev) => ({
        ...prev,
        guideId: guideId, // Adding guideId to the formData
      }));
    }
  }, [guideId]);

  // useEffect(
  //   () =>
  //     setFormData((prev) => ({
  //       ...prev,
  //       perHourRate: perHourRate,
  //     })),
  //   [perHourRate]
  // );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    } else {
      switch (name) {
        case "contact":
          if (!/^\d{10}$/.test(value)) {
            error = "Please enter a valid 10-digit phone number";
          }
          break;
        case "perHourRate":
          if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            error = "Please enter a valid perHourRate";
          }
          break;
        case "about":
          if (value.length < 20) {
            error = "Please provide at least 20 characters";
          }
          break;
      }
    }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
     
        const response = await API.post(
          "/users/update-guide-details",
          { ...formData },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response?.data?.success) {
          toast.success(response.data.message);
          navigate("/book-guide/update-docs");
        }
      } catch (error) {
          toast.error(error.response?.data?.message || "Error while updating guide profile");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[700px] border-none">
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            Update Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">
                  Contact Number
                  {formData.contact.trim() === "" && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className={errors.contact ? "border-red-500" : ""}
                />
                {errors.contact && (
                  <span className="text-red-500 text-sm">{errors.contact}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">
                  Address
                  {formData.address.trim() === "" && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">{errors.address}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="about">
                  About Me
                  {formData.about.trim() === "" && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Type your message here."
                  className={errors.about ? "border-red-500" : ""}
                />
                {errors.about && (
                  <span className="text-red-500 text-sm">{errors.about}</span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">
                  Languages
                  {formData.language.trim() === "" && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Enter languages"
                  className={errors.language ? "border-red-500" : ""}
                />
                {errors.language && (
                  <span className="text-red-500 text-sm">
                    {errors.language}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="perHourRate">
                  Price
                  {formData.perHourRate.trim() === "" && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                <Input
                  id="perHourRate"
                  name="perHourRate"
                  value={formData.perHourRate}
                  onChange={handleChange}
                  placeholder="Enter your perHourRate"
                  className={errors.perHourRate ? "border-red-500" : ""}
                />
                {errors.perHourRate && (
                  <span className="text-red-500 text-sm">{errors.perHourRate}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-700 hover:text-black"
              >
                Update
              </Button>
              <Button
                type="button"
                className="bg-white hover:text-gray-100 text-black"
              >
                Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
