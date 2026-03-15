import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { generateTrip } from "@/service/AIModal";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig"; // adjust relative path // firebase config jaha hai
import { useNavigate, useNavigation } from "react-router-dom";

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    location: "",
    days: "",
    budget: "",
    travelers: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // fixed typo
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchLocation = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`,
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      toast.error("Location search failed");
    }
  };

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    const timer = setTimeout(() => {
      searchLocation(formData.location);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.location]);

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      try {
        const resp = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResp?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResp?.access_token}`,
              Accept: "application/json",
            },
          },
        );
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        toast.success("Logged in successfully!");
        onGenerateTrip(); // generate trip after login
      } catch (err) {
        console.log(err);
        toast.error("Google login failed");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Google login failed");
    },
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true); // now dialog will pop
      return;
    }

    if (
      !formData.location ||
      !formData.days ||
      !formData.budget ||
      !formData.travelers
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(formData.days) > 7) {
      toast.error("Trip can be max 7 days");
      return;
    }

    try {
      setLoading(true);

      const tripData = await generateTrip(formData);

      if (!tripData) throw new Error("Invalid AI response");

      console.log("Generated Trip:", tripData);
      SaveAiTrip(tripData);
      toast.dismiss();
      toast.success("Trip generated successfully 🚀");
    } catch (error) {
      toast.dismiss();
      toast.error("Trip generation failed");
      console.error(error);
    }

    setLoading(false);
  };

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us Your travel Preferences 🏕️🌴
      </h2>

      <div className="mt-20 flex flex-col gap-9">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">Destination</h2>
          <div className="relative">
            <Input
              placeholder="Search Destination"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            {suggestions.length > 0 && (
              <div className="absolute bg-white w-full border rounded-lg mt-2 shadow-lg z-10 max-h-60 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setIsSelecting(true);
                      handleInputChange("location", item.display_name);
                      setSuggestions([]);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                  >
                    {item.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">Days</h2>
          <Input
            type="number"
            max="7"
            placeholder="Ex. 3"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">Budget</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData.budget === item.title ? "border-black shadow-lg" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="text-xl my-3 font-medium">Travelers</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("travelers", item.title)}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData.travelers === item.title
                    ? "border-black shadow-lg"
                    : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      {/* Google Sign Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo1.svg" />
              <h2 className="font-bold text-lg mt-7">Sign with Google</h2>
              <p>Sign to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
