import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({ hotel }) => {

  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60'); // Default Hotel Fallback
  
  useEffect(() => {
    if (hotel) {
      GetHotelPhoto();
    }
  }, [hotel]);

  const GetHotelPhoto = async () => {
    try {
      // Hotel Name + Address ka use karke search query banayein
      const query = `${hotel?.hotelName} hotel`;
      
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: {
          Authorization: import.meta.env.VITE_PEXEL_API_KEY,
        },
      });

      if (response.data.photos.length > 0) {
        setPhotoUrl(response.data.photos[0].src.large);
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
    }
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">

        <img
          className="rounded-xl w-full h-[180px] object-cover shadow-sm"
          src={photoUrl}
          alt={hotel?.hotelName}
        />

        <div className="my-2 flex flex-col gap-1">
          <h2 className="font-medium text-black">{hotel?.hotelName}</h2>

          <h2 className="text-xs text-gray-500">
            📍 {hotel?.hotelAddress}
          </h2>

          <h2 className="text-sm font-semibold">💰 {hotel?.price}</h2>

          <h2 className="text-sm text-yellow-600 font-medium">⭐ {hotel?.rating} stars</h2>
        </div>

      </div>
    </Link>
  )
}

export default HotelCardItem