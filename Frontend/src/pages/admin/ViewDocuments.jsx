import React from "react";
import { Card } from "@/components/ui/card";  // Assuming ShadCN has a Card component

const ViewDocuments = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-32 gap-6 p-6 border border-gray-300 rounded-3xl">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2 border border-gray-200">
                <Card>
                    <img
                        src="/frontCitizenship.jpg"
                        alt="Card Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Front Citizenship </h3>
                        <p className="text-gray-600 mt-2">front citizenship page</p>
                    </div>
                </Card>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2 border border-gray-200">
                <Card>
                    <img
                        src="/backCitizenship.jpg"
                        alt="Card Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Back Citizenship</h3>
                        <p className="text-gray-600 mt-2">back citizenship page</p>
                    </div>
                </Card>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2 border border-gray-200">
                <Card>
                    <img
                        src="/drivingLicense.jpg"
                        alt="Card Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Driving License</h3>
                        <p className="text-gray-600 mt-2">driving license page</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ViewDocuments;
