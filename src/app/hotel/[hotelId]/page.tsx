import AddHotelForm from "@/components/hotel/AddHotelForm";
import { getHotelById } from "../../../../actions/getHotelById";
import { useUser } from "@clerk/nextjs";

interface HotelPageProps {
    params: {
        hotelId: string
    }
}

const Hotel = async ({ params }: HotelPageProps) => {
    const hotel = await getHotelById(params.hotelId)
    const { user } = useUser();

    if (!user) return <div>Not authenticated...</div>;

    if (hotel && hotel.userId !== user.id) return <div>Access Denied</div>;

    return (
        <div>
            {hotel && <AddHotelForm hotel={hotel} />}
        </div>
    );
}

export default Hotel;
