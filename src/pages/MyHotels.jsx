import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ICONS
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

// useState
import { useStatesForMyHotel } from '../Hooks/Hooks';

const MyHotels = () => {
  axios.defaults.withCredentials = true;

   {/* useState */}
  const { hotels, setHotels} = useStatesForMyHotel()

  useEffect(() => {
    // my-hotels/
    // Take data as JSON
    axios.get('http://localhost:7000/my-hotels')
      .then(response => { 
        setHotels(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }, []); 

  // Delete Func
  const deleteButton = async (hotelId) => {
    try {
      // my-hotels/delete/:id
      const response = await axios.delete(`http://localhost:7000/my-hotels/delete/${hotelId}`);
      
      if (response.data.message === "Hotel deleted successfully") {
        const updatedHotels = hotels.filter((hotel) => hotel._id !== hotelId);
        setHotels(updatedHotels);
      } else {
        console.error("Delete error -> Hotel not founds");
      }
    } catch (error) {
      console.error("Delete error ->", error);
    }
  };

  return (
    <div>
      {/* My Hotel */}
      <div className='space-y-5 pl-60 pr-60'>
        <span className='flex justify-between mt-4'>
          <h1 className='text-3xl font-bold'>Your Hotels</h1>
           {/* localhost:7000/add-hotel*/}
          <Link to='/add-hotel' className='flex bg-blue-600 text-white text-xl font-bold p-2 rounded hover:rounded-none hover:duration-300 duration-300  hover:bg-blue-500'>
            Add Hotel
          </Link>
        </span>
      </div> 
       {/* Description */}
      {hotels.map((hotel) => (
        <div className='mt-4 mb-6 pl-60 pr-60' key={hotel._id}>
          <div className='bg-blue-300/50'>
            <h3 className='font-bold text-2xl'>{hotel.name}</h3>
            <span>{hotel.description}</span>

         {/* Details Section */}
            <div className='grid grid-cols-5 gap-2'>
              <div className='flex'>
                <BsMap className='mr-2 mt-1' />
                {hotel.city}, {hotel.country}
              </div>
              <div className='flex'>
                <BsBuilding className='mr-2 mt-1' />
                {hotel.type}
              </div>
              <div className='flex'>
                <BiMoney className='mr-2 mt-1' />
                € {hotel.pricePerNight} per night
              </div>
              <div className='flex'>
                <BiHotel className='mr-2 mt-1' />
                {hotel.adultCount} Adult, {hotel.childCount} Children
              </div>
              <div className='flex'>
                <BiStar className='mr-2 mt-1' />
                {hotel.starRating} star rating
              </div>
            </div>
          </div>
          <div className='flex justify-between mt-6'>
           {/* Delete Button */}
            <button
              className='bg-blue-600  hover:bg-red-500 hover:duration-500 duration-500 text-white font-bold h-10 w-28 rounded  text-lg text-center'
              onClick={() => deleteButton(hotel._id)}>
              Delete
            </button> 
             {/* localhost:7000/my-hotels/edit/:id */}
             <Link
              to={`/my-hotels/edit/${hotel._id}`}
              className='bg-blue-600 hover:bg-blue-500 hover:rounded-none hover:duration-300 duration-300 text-white font-bold w-28 h-10 rounded-lg text-lg flex items-center justify-center'>
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHotels;
