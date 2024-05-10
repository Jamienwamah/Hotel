import AddHotelForm from "@/components/hotel/AddHotelForm";
import { getHotelById } from "../../../../actions/getHotelById";
import { clerkMiddleware } from "@clerk/nextjs/server";

interface HotelPageProps {
    params: {
        hotelId: string
    }
}

const Hotel = async ({ params }: HotelPageProps) => {
    const hotel = await getHotelById(params.hotelId)
    const {userId} = clerkMiddleware()


    if (!userId) return <div>Not authenticated...</div>

    if (hotel && hotel.userId !== userId) return <div>Access Denied</div>

    return (<div>
        < AddHotelForm />
    </div>);
}

export default Hotel;