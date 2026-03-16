import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  );

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const locationName = trip?.userSelection?.location;
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${locationName}&per_page=1`,
        {
          headers: {
            Authorization: import.meta.env.VITE_PEXEL_API_KEY,
          },
        }
      );

      if (response.data.photos.length > 0) {
        setPhotoUrl(response.data.photos[0].src.large);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      {/* group class for hover effects on children */}
      <div className="group border rounded-xl p-3 hover:shadow-2xl transition-all cursor-pointer bg-white h-full flex flex-col">
        
        <img
          className="rounded-xl w-full h-[200px] object-cover shadow-sm group-hover:opacity-90 transition-all"
          src={photoUrl}
          alt={trip?.userSelection?.location}
        />

        <div className="mt-4 flex flex-col flex-1">
          {/* Location - line-clamp handles long names */}
          <h2 className="font-bold text-lg md:text-xl text-gray-900 line-clamp-1">
            {trip?.userSelection?.location}
          </h2>

          <p className="text-sm text-gray-500 mt-2 font-medium">
            🗓️ {trip?.userSelection?.days} Day Trip with {trip?.userSelection?.budget} Budget
          </p>

          <div className="mt-auto pt-4 flex justify-between items-center">
             <span className="text-orange-600 font-bold text-sm">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;