import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => {
          return (
            <div className="mt-5" key={index}>
              <div>
                <h2 className="font-medium text-lg">Day {item.day}</h2>
                <div className="grid md: grid-cols-2 gap-5">
                  {item?.places?.map((place, i) => {
                    return (
                      <div  key={i}>
                        <h2 className="font-medium text-sm text-orange-600">
                          {place.time}
                        </h2>
                        <PlaceCardItem place={place} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesToVisit;
