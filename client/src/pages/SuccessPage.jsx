import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../services/auth-service";
import { message } from "antd";

const SuccessPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
 
  const onFinish = async () => {
    setLoading(true);
    try {
      const response = await logout(id);
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("expiresAt");
        message.success(response.message);
        navigate(`/login`);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-center text-4xl text-green-500 font-bold">
          Login Succesfull
        </h1>

        <h1 className="text-center bg-blue-500 hover:bg-white cursor-pointer px-6 py-2 border-2 border-blue-500 text-white hover:text-blue-500 transition-all rounded-lg" onClick={onFinish}>
          Logout
        </h1>
      </div>
    </>
  );
};

export default SuccessPage;
