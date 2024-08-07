import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import MenuComponent from "../components/MenuComponent";
import LoggedOut from "../components/LoggedOut";

function LandingPage() {
  const location = useLocation();
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (userStatus) {
      // Retrieve the access token from cookies
      function getAccessTokenFromCookies() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
          const [name, value] = cookie.split("=");
          if (name === "accessToken") {
            return value;
          }
        }
        return null; // Return null if access token is not found in cookies
      }

      // Save the access token to local storage
      function saveAccessTokenToLocalStorage(token) {
        localStorage.setItem("accessToken", token);
      }

      // Get the access token from cookies
      const tokenFromCookies = getAccessTokenFromCookies();
      if (tokenFromCookies) {
        setAccessToken(tokenFromCookies);
        saveAccessTokenToLocalStorage(tokenFromCookies);
      }
    }
  }, [userStatus]); // Depend on userStatus to run this effect when it changes

  return (
    <div className="bg-black/65  bg-blend-screen ">
      <div className="relative">
        <Header status={userStatus} />
      </div>
      <div className={`flex ${!userStatus && "flex-col"}  md:flex-row relative`}>
        <div
          className={`sticky ${
            location.pathname === "/" ||
            location.pathname === "/publish" ||
            location.pathname === "/profile" ||
            location.pathname === "/subscribedChannels" ||
            location.pathname === "/history"
              ? "block"
              : "hidden md:block"
          } top-32  h-full  p-4`}
        >
          <div className="flex align-middle mt-16 md:mt-10">
            <ListIcon style={{ fill: "violet", fontSize: 40 }} />
            <label
              htmlFor=""
              className="text-white text-3xl ml-5 font-bold hidden md:block"
            >
              Menu
            </label>
          </div>
          <MenuComponent status={userStatus} />
        </div>
        <div className="mx-10 w-[80vw] flex flex-col min-h-screen mt-16 md:mt-0 pt-36">
          {userStatus ? <Outlet /> : <LoggedOut />}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
