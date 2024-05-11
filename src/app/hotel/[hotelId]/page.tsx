import React, { useEffect, useState } from 'react';
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { getHotelById } from "../../../../actions/getHotelById";
import { useUser } from "@clerk/nextjs";

interface HotelPageProps {
    params: {
        hotelId: string
    }
}

const Hotel = ({ params }: HotelPageProps) => {
    const [hotel, setHotel] = useState<any>(null);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const hotelData = await getHotelById(params.hotelId);
                setHotel(hotelData);
            } catch (error) {
                console.error('Error fetching hotel:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [params.hotelId]);

    if (!user) return <div>Not authenticated...</div>;

    if (loading) return <div>Loading...</div>;

    if (hotel && hotel.userId !== user.id) return <div>Access Denied</div>;

    return (
        <div>
            {hotel && <AddHotelForm hotel={hotel} />}
        </div>
    );
}

export default Hotel;
