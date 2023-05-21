import React, { useEffect, useState } from "react";
import {
  verifyGoogleAccount,
  getAccountDetails,
  getAdmins,
  logout,
} from "../actions";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    const data = await getAccountDetails();
    const adminUsers = await getAdmins();

    if (
      data !== undefined &&
      adminUsers.documents.some((obj) => obj.email === data.email)
    ) {
      navigate("/");
    } else {
      await logoutSession();
    }
    setLoading(false);
  };

  const logoutSession = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAuth = () => {
    verifyGoogleAccount();
  };

  return (
    <div
      className="flex w-full flex-col justify-center items-center bg-secondary p-6"
      style={{ height: "100vh" }}
    >
      <div className="bg-gray-800 rounded-3xl p-6 flex flex-col">
        <div className="flex p-3 items-center">
          <img
            src="logo.png"
            alt=""
            className="lg:w-[100px] lg:h-[100px] xl:w-[100px] xl:h-[100px] md:w-[70px] md:h-[70px] w-[40px] h-[40px] object-contain mr-[4px]"
          />
          <span className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-white">
            TechSouqDubai
          </span>
        </div>
        <div className="flex justify-center mt-12">
          {loading ? (
            <p className="text-white text-lg">Loading...</p>
          ) : (
            <button
              onClick={() => handleAuth()}
              className="flex bg-gray-700 rounded-md px-4 py-2 text-white transform hover:-translate-y-[2px] hover:shadow-lg active:scale-95 duration-200 ease-in-out"
            >
              <img
                src="googleLogo.png"
                alt=""
                className="w-[25px] h-[25px] object-contain mr-[10px] "
              />
              <span className="md:text-lg lg:text-xl xl:text-xl text-md">
                Sign In with Google!
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
