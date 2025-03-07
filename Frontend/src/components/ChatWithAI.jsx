import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Send, X } from 'lucide-react';
import { API } from '../../API';

const ChatWithAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll to bottom when chatHistory updates
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setLoading(true);

        // Add user message to chat history
        setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
        setMessage('');

        try {
            const response = await API.post('/users/chat-with-ai', {
                question: message
            });

            if (response.data.success) {
                setChatHistory(prev => [...prev, { sender: 'ai', text: response.data.data }]);
            } else {
                setChatHistory(prev => [...prev, { sender: 'ai', text: "Sorry, I couldn't fetch recommendations." }]);
            }
        } catch (error) {
            setChatHistory(prev => [...prev, { sender: 'ai', text: "An error occurred. Please try again." }]);
        }

        setLoading(false);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!isOpen && (
                <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-blue-500 text-white p-4 rounded-full shadow-lg">
                    <MessageCircle size={20} /> Chat with iGuide
                </Button>
            )}

            {isOpen && (
                <Card className="w-80 shadow-xl rounded-lg fixed bottom-20 right-5">
                    {/* Header */}
                    <CardHeader className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-t-lg">
                        <span>iGuide ChatBot</span>
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>
                            <X size={20} className="text-white" />
                        </Button>
                    </CardHeader>

                    {/* Chat Content */}
                    <CardContent className="p-4 h-64 overflow-y-auto">
                        {chatHistory.length === 0 && (
                            <p className="text-gray-600 text-sm">👋 Hi there! I am Travel Guide. Ask me about Nepal travel recommendations!</p>
                        )}
                        {chatHistory.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`mb-2 p-2 rounded-lg max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-100 text-right ml-auto' : 'bg-gray-200 text-left mr-auto'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && <p className="text-sm text-gray-500">Thinking...</p>}
                        <div ref={chatEndRef} />
                    </CardContent>

                    {/* Input Field */}
                    <div className="p-3 flex items-center border-t">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-full"
                            aria-label="Chat input"
                        />
                        <Button onClick={sendMessage} className="ml-2 bg-blue-500 text-white" disabled={loading}>
                            <Send size={18} />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ChatWithAI;
