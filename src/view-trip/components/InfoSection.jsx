import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";

const InfoSection = ({ trip }) => {
  // Default image jab tak API se real image na aa jaye
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=60');

  useEffect(() => {
    if (trip?.userSelection?.location) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const locationName = trip?.userSelection?.location;
      
      // Pexels Search API call
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${locationName}&per_page=1`, {
        headers: {
          Authorization: import.meta.env.VITE_PEXEL_API_KEY, // Aapki env key
        },
      });

      if (response.data.photos.length > 0) {
        // 'large2x' size header ke liye best hai
        setPhotoUrl(response.data.photos[0].src.large2x);
      }
    } catch (error) {
      console.error("Error fetching Pexels photo:", error);
    }
  };

  return (
    <div className="mt-5">
      <img
        className="h-[340px] w-full object-cover rounded-xl shadow-md"
        src={photoUrl}
        alt={trip?.userSelection?.location || "Trip Location"}
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>

          <div className="flex flex-wrap gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              📅 {trip?.userSelection?.days} Days
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              🥂 No. of Traveler: {trip?.userSelection?.travelers}
            </h2>
          </div>
        </div>

        <Button className="rounded-full">
          <BsFillSendFill />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;