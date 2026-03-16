import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    /* Changes: 
       - mx-56 ko hata kar px-5 (mobile) aur lg:px-40 (desktop) kiya.
       - gap ko responsive banaya (gap-5 on mobile, gap-9 on desktop).
    */
    <div className="flex items-center flex-col px-5 md:px-20 lg:px-40 gap-6 md:gap-9">
      
      {/* Text Size Fix:
          - text-3xl (Mobile)
          - md:text-5xl (Tablet)
          - lg:text-[60px] (Desktop)
      */}
      <h1 className="text-3xl md:text-5xl lg:text-[60px] font-extrabold text-center mt-10 md:mt-16 leading-tight">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>
        <br />
        <span className="text-gray-900">
          Personalized Itineraries at Your Fingertips
        </span>
      </h1>

      {/* Paragraph text size adjusted */}
      <p className="text-base md:text-xl text-gray-500 text-center max-w-2xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button className="px-8 py-6 text-lg rounded-lg shadow-md hover:scale-105 transition-all">
          Get Started, it's Free
        </Button>
      </Link>

      {/* Image Responsive Fix: w-full added */}
      <img 
        src="/landing.png" 
        className="w-full max-w-4xl mt-5 md:mt-10 rounded-xl object-contain " 
        alt="App Preview"
      />
    </div>
  );
};

export default Hero;