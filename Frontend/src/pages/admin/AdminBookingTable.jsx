import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { API } from "../../../API";

export default function AdminBookingsTable() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get("/users/get-booked-user-guide");
                const data = response.data.bookedUsersAndGuides;

                // Create a map for quick guide lookup by id
                const guideMap = data.reduce((acc, guide) => {
                    acc[guide._id] = guide;
                    return acc;
                }, {});

                const formattedData = [];

                data.forEach((user) => {
                    user.reservation.forEach((res) => {
                        const guide = guideMap[res.guide] || {};
                        formattedData.push({
                            touristName: user.name,
                            touristEmail: user.email,
                            guideName: guide.name || "Unknown",
                            guideEmail: guide.email || "Unknown",
                            location: res.location,
                            timePeriod: res.timePeriod,
                            people: res.people,
                            totalCost: res.cost.totalCost,
                            profitMargin: res.cost.profitMargin,
                        });
                    });
                });

                setBookings(formattedData);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (bookings.length === 0) return <p>No bookings available.</p>;

    return (
        <Card className="p-4">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tourist</TableHead>
                            <TableHead>Tourist Email</TableHead>
                            <TableHead>Guide</TableHead>
                            <TableHead>Guide Email</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Time Period</TableHead>
                            <TableHead>People</TableHead>
                            <TableHead>Total Cost</TableHead>
                            <TableHead>Company Profit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking, index) => (
                            <TableRow key={index}>
                                <TableCell>{booking.touristName}</TableCell>
                                <TableCell>{booking.touristEmail}</TableCell>
                                <TableCell>{booking.guideName}</TableCell>
                                <TableCell>{booking.guideEmail}</TableCell>
                                <TableCell>{booking.location}</TableCell>
                                <TableCell>{booking.timePeriod}</TableCell>
                                <TableCell>{booking.people}</TableCell>
                                <TableCell>{booking.totalCost}</TableCell>
                                <TableCell>{booking.profitMargin}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
