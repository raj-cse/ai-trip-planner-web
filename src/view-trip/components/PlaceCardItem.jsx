import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import React from 'react'
import { Link } from 'react-router-dom';

const PlaceCardItem = ({ place }) => {
  // Placeholder image based on place name (encodeURIComponent ensures special characters don't break the URL)
  const imageUrl = `https://picsum.photos/400/300?random=${encodeURIComponent(place?.placeName)}`;

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place?.placeName)}
      target="_blank"
    >
      {/* flex-col: Mobile par image upar, text niche
          md:flex-row: Desktop par side-by-side (row)
      */}
      <div className='border rounded-xl p-3 mt-2 flex flex-col md:flex-row gap-4 hover:scale-105 transition-all hover:shadow-lg cursor-pointer bg-white h-full'>
        
        {/* Image: Mobile par w-full, Desktop par fixed w-[130px] */}
        <img
          className='w-full md:w-[130px] h-[180px] md:h-[130px] rounded-xl object-cover shadow-sm'
          src={imageUrl}
          alt={place?.placeName}
        />
        
        <div className='flex flex-col flex-1'>
          <h2 className='font-bold text-lg md:text-xl text-gray-900 leading-tight'>
            {place?.placeName}
          </h2>
          <p className='text-sm text-gray-500 mt-1 line-clamp-2 md:line-clamp-3'>
            {place?.placeDetails}
          </p>
          
          <div className='flex justify-between items-center mt-3 md:mt-auto'>
             <h2 className='text-sm font-bold text-orange-600 flex items-center gap-1'>
               ⏲️ {place?.travelTime}
             </h2>
             {/* Map icon sirf mobile par (md:hidden) dikhega clickable feel ke liye */}
             <div className='p-2 bg-orange-50 rounded-full md:hidden'>
                <FaMapLocationDot className='text-orange-600 h-5 w-5' />
             </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem;