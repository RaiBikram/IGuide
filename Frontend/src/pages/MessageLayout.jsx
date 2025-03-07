import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MessageLayout = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-1/2 shadow-lg">
                <CardContent className="p-4">
                    <div className="text-center font-bold text-lg mb-4">Tourist Guide Chat</div>
                    <div className="space-y-3">
                        {/* Incoming message */}
                        <div className="flex items-start">
                            <img src="/girl.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                            <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                                Hello! I’m visiting Nepal for the first time. Can you suggest some must-visit places?
                            </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="flex justify-end items-start">
                            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                                Welcome! You should definitely visit Kathmandu, Pokhara, and Chitwan for an amazing experience.
                            </div>
                            <img src="/boy.jpg" alt="Guide Avatar" className="w-8 h-8 rounded-full ml-2" />
                        </div>

                        {/* Incoming message */}
                        <div className="flex items-start">
                            <img src="/girl.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                            <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                                That sounds great! What’s the best way to travel between these places?
                            </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="flex justify-end items-start">
                            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                                You can take tourist buses, domestic flights, or even hire a private vehicle for comfort.
                            </div>
                            <img src="/boy.jpg" alt="Guide Avatar" className="w-8 h-8 rounded-full ml-2" />
                        </div>

                        {/* Incoming message */}
                        <div className="flex items-start">
                            <img src="/girl.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                            <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                                Awesome! What local food should I try?
                            </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="flex justify-end items-start">
                            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                                Try Dal Bhat, Momo, and Newari cuisine for an authentic taste of Nepal.
                            </div>
                            <img src="/boy.jpg" alt="Guide Avatar" className="w-8 h-8 rounded-full ml-2" />
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <input
                            type="text"
                            placeholder="Message"
                            className="flex-1 border rounded-l-lg p-2"
                        />
                        <Button className="rounded-r-lg">Send</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MessageLayout;
