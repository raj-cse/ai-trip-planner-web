import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl md:text-3xl mb-8 text-gray-800">Places to Visit</h2>
      
      <div className="space-y-12">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="border-l-4 border-orange-400 pl-5 md:pl-8 relative">
            {/* Timeline Dot (Styling point) */}
            <div className="absolute -left-[10px] top-0 h-4 w-4 rounded-full bg-orange-500 border-4 border-white shadow-sm" />

            {/* Day Header */}
            <h2 className="font-bold text-xl mb-5 bg-orange-50 text-orange-700 px-5 py-1.5 rounded-full inline-block shadow-sm">
              Day {item.day}
            </h2>
            
            {/* grid-cols-1: Mobile par cards pichkenge nahi, poori width lenge
                lg:grid-cols-2: Badi screens par content ko split karega
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              {item?.places?.map((place, i) => (
                <div key={i} className="flex flex-col">
                  {/* Time Badge */}
                  <h2 className="font-bold text-xs md:text-sm text-orange-500 mb-1.5 uppercase tracking-widest flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
                    {place.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;