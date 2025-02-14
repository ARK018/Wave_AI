import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#131315]">
      <div className="text-center px-4 lg:px-40 py-8 rounded-lg bg-[#c4e456] shadow-2xl">
        <div className="mb-8">
          <h1 className="text-8xl font-extrabold text-primary relative z-10">
            404
          </h1>
        </div>
        <p className="text-2xl font-medium text-gray-900 mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-gray-800 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          className="px-6 py-3 bg-primary hover:text-white/80 text-white text-sm font-medium rounded-full bg-[#131315] inline-flex items-center"
          onClick={handleHomeClick}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
