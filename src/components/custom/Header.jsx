import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

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
          }
        );

        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        toast.success("Logged in successfully!");
        window.location.reload();
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

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">

      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <img src="/tripplanner.logo.png" alt="Logo" className="h-10" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent tracking-wide ">AI Trip Planner</h1>
      </div>

      <div>
        {user?.picture ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user.picture}
                  alt="profile"
                  className="h-[35px] w-[35px] rounded-full object-cover cursor-pointer border"
                />
              </PopoverTrigger>

              <PopoverContent className="w-24">
                <h2
                  className="cursor-pointer text-red-500"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo1.svg" className="h-12" />

              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>

              <p>Sign in to the app securely using Google authentication</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;