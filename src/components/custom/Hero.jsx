import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    /* Change: 
       - 'min-h-screen' add kiya taaki ye poori screen cover kare.
       - 'pb-10' (padding bottom) add kiya taaki image niche se chipke nahi.
    */
    <div className="flex items-center flex-col px-5 md:px-20 lg:px-44 gap-6 md:gap-9 min-h-screen pb-10">
      
      <h1 className="text-3xl md:text-5xl lg:text-[60px] font-extrabold text-center mt-10 md:mt-16 leading-tight">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>
        <br />
        <span className="text-gray-900">
          Personalized Itineraries at Your Fingertips
        </span>
      </h1>

      <p className="text-base md:text-xl text-gray-500 text-center max-w-2xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button className="px-8 py-6 text-lg rounded-lg shadow-md hover:scale-105 transition-all">
          Get Started, it's Free
        </Button>
      </Link>

      {/* Image styling: 'mt-auto' use kar sakte hain agar image ko hamesha bottom mein rakhna ho */}
      <img 
        src="/landing.png" 
        className="w-full max-w-5xl mt-5 md:mt-10 rounded-xl object-contain " 
        alt="App Preview"
      />
    </div>
  );
};

export default Hero;