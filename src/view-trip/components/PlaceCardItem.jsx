import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import React from 'react'
import { Link } from 'react-router-dom';

const PlaceCardItem = ({place}) => {

  const imageUrl = `https://picsum.photos/200/200?random=${place?.placeName}`;

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className='border rounded-xl p-3 mt-2 gap-5 flex hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        
        <img
          className='w-[130px] h-[130px] rounded-xl object-cover'
          src={imageUrl}
          alt={place?.placeName}
        />
        
        <div className='font-bold text-lg'>
          <h2>{place?.placeName}</h2>
          <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
          <h2 className='text-sm text-gray-800 mt-2'>⏲️ {place?.travelTime}</h2>
        </div>

      </div>
    </Link>
  )
}

export default PlaceCardItem