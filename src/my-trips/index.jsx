import { collection, getDocs, where, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {

  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    const trips = [];

    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,     
        ...doc.data(),
      });
    });

    setUserTrips(trips);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">

      <h2 className="text-3xl font-bold">My Trips</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">

        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          : [1,2,3,4,5,6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))
        }

      </div>
    </div>
  );
};

export default MyTrips;