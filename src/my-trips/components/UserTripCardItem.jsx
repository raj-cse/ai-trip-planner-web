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

      <div className="hover:scale-105 transition-all cursor-pointer">

        <img
          className="rounded-xl w-full h-[180px] object-cover shadow-sm"
          src={photoUrl}
          alt={trip?.userSelection?.location}
        />

        <div className="mt-2">

          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location}
          </h2>

          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.days} Day Trip with {trip?.userSelection?.budget} Budget
          </h2>

        </div>

      </div>

    </Link>
  );
};

export default UserTripCardItem;