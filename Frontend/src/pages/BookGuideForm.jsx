import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/contextAPi/AuthContext";
import { toast } from "react-toastify";

import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API } from "../../API";

const BookGuideForm = ({ perHourRate=5, tds=1.5, marginalProfit=10 }) => {
  const [location, setLocation] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [people, setPeople] = useState("");
  const [hour, setHour] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const { token, user } = useContext(AuthContext);
  const { guideId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const response = await API.post(
        "/users/book-guide",
        {
          tds,
          guideId,
          location,
          timePeriod,
          people,
          perHourRate,
          profitMargin:marginalProfit ,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Guide booked successfully!");
        setLocation("");
        setTimePeriod("");
        setPeople("");
        navigate("/guides");
      }
    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data?.message || "Error booking guide");
    }
  };

  const calculateCost = () => {
    const [start, end] = timePeriod.split(" to ");
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const hours = (endDate - startDate) / (1000 * 60 * 60); // Calculate total hours
    setHour(hours);
  
    if (!isNaN(hours) && hours > 0 && people) {
      const baseCost = perHourRate * hours * parseInt(people);
      
      const tdsAmount = baseCost * (tds / 100);
      const profitMarginAmount = baseCost * (marginalProfit / 100);
      const total = baseCost + tdsAmount + profitMarginAmount;
      
      // Round the total cost to 2 decimal places
      setTotalCost(total.toFixed(2)); // Rounded to 2 decimal places for cleaner display
    } else {
      setTotalCost("Invalid input");
    }
  };
  
  useEffect(() => {
    calculateCost();
  }, [timePeriod, people]);

  return (
    <div className="flex justify-center flex-wrap items-center min-h-screen">
      <div className="grid grid-cols-2 gap-8">
        <Card className="p-6 w-96 shadow-xl">
          <CardContent>
            <h1 className="text-xl font-bold mb-4">Book a Guide</h1>
            <div className="mb-4">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="timePeriod">
                Time Period (e.g. 2025-02-05 to 2025-02-07)
              </Label>
              <Input
                id="timePeriod"
                placeholder="Enter time period"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="numPeople">Number of People</Label>
              <Input
                id="numPeople"
                type="number"
                placeholder="Enter number of people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleSubmit}>
              Book Guide
            </Button>
          </CardContent>
        </Card>
        {totalCost !== "Invalid input" && (
          <Card className="p-6 w-96 shadow-xl flex justify-center text-start items-center">
            <CardContent>
              <div className="text-start">
                <h2 className="text-lg font-medium">Total Cost</h2>
                <p>Location : {location}</p>
                <p>TDS : {tds}%</p>
                <p>Duration : {hour} hours</p>
                <p>Per Hour Rate : ${perHourRate} </p>
                <p>Marginal Profit : {marginalProfit} %</p>
                <p>Total People: {people}</p>
                <div className="mt-4 text-2xl font-bold">
                  ${totalCost}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookGuideForm;
