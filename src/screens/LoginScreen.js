import React, { useEffect } from "react";
import { verifyGoogleAccount, getAccountDetails } from "../actions";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const whiteListEmails = ["karandua2002@gmail.com", "ppratham1180@gmail.com"];

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await getAccountDetails();

    if (data !== undefined && whiteListEmails.includes(data.email)) {
      navigate("/");
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
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
