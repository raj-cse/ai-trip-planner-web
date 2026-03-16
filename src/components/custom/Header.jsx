import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const Header = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) { setUser(JSON.parse(storedUser)); }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      try {
        const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResp?.access_token}`, {
          headers: { Authorization: `Bearer ${codeResp?.access_token}`, Accept: "application/json" }
        });
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        toast.success("Logged in successfully!");
      } catch (err) { toast.error("Google login failed"); }
    },
  });

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-2 md:px-10 bg-white sticky top-0 z-50">
      
      {/* Logo Section - Text size adjusted for mobile */}
      <div className="flex items-center gap-1 md:gap-2">
        <img src="/tripplanner.logo.png" alt="Logo" className="h-6 md:h-10" />
        <h1 className="hidden xs:block text-[10px] sm:text-sm md:text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          AI Trip Planner
        </h1>
      </div>

      <div className="flex items-center gap-1 md:gap-4">
        {user ? (
          <div className="flex items-center gap-1 md:gap-3">
            
            {/* Create Trip Button - Mobile responsive padding */}
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-[9px] md:text-sm px-2 md:px-4 h-7 md:h-10 border-orange-200">
                + Create Trip
              </Button>
            </a>
            
            {/* My Trips - Ab ye mobile par bhi dikhega */}
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-[9px] md:text-sm px-2 md:px-4 h-7 md:h-10 border-orange-200">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger asChild>
                <img src={user?.picture} className="h-7 w-7 md:h-9 md:w-9 rounded-full cursor-pointer border object-cover" />
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2 shadow-md">
                <h2 className="cursor-pointer text-red-500 text-sm text-center font-medium p-2 hover:bg-red-50 rounded-md" 
                    onClick={() => { googleLogout(); localStorage.clear(); setUser(null); window.location.reload(); }}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="text-[10px] md:text-sm h-8 md:h-10 px-3">Sign in</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[95vw] md:max-w-[400px] rounded-2xl p-6">
          <DialogHeader className="flex flex-col items-center">
            <img src="/logo1.svg" className="h-10" alt="logo" />
            <h2 className="font-bold text-lg mt-5">Sign in with Google</h2>
            <Button onClick={login} className="w-full mt-6 flex gap-4 items-center justify-center py-5">
              <FcGoogle className="h-6 w-6" /> Sign In with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;