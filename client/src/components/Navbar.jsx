import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const session = JSON.parse(localStorage.getItem("userSession"));

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleDashboardClick = () => {
    const selected = localStorage.getItem("selected");
    if (selected === "feature2") {
      navigate("/dashboard/feature2");
    } else {
      navigate("/dashboard/feature1");
    }
    console.log(selected);
  };

  return (
    <div className="bg-[#131315] w-full h-16 flex justify-between items-center px-12 border-b border-white/10">
      <div
        onClick={handleHomeClick}
        className="flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.9008 6.68909C21.1924 6.68909 21.4729 6.7832 21.6791 6.95127C21.8854 7.11933 22.0009 7.3479 22.0009 7.58545V21.0309C22.0009 21.2684 21.8854 21.497 21.6791 21.665C21.4729 21.8331 21.1924 21.9272 20.9008 21.9272C20.2931 21.9272 19.8008 21.5261 19.8008 21.0309V7.58546C19.8008 7.09024 20.2931 6.68909 20.9008 6.68909Z"
            fill="#C4E456"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5004 10.2748C12.792 10.2748 13.0725 10.3689 13.2788 10.537C13.485 10.705 13.6005 10.9336 13.6005 11.1711V18.3419C13.6005 18.5794 13.485 18.808 13.2788 18.9761C13.0725 19.1441 12.792 19.2382 12.5004 19.2382C11.8927 19.2382 11.4004 18.8371 11.4004 18.3419V11.1712C11.4004 10.6759 11.8927 10.2748 12.5004 10.2748Z"
            fill="#C4E456"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.101 12.0668C25.3925 12.0668 25.6731 12.1609 25.8793 12.329C26.0856 12.497 26.2011 12.7256 26.2011 12.9631V16.5485C26.2011 16.786 26.0856 17.0146 25.8793 17.1827C25.6731 17.3508 25.3926 17.4449 25.101 17.4449C24.4933 17.4449 24.001 17.0437 24.001 16.5485V12.9631C24.001 12.4679 24.4933 12.0668 25.101 12.0668Z"
            fill="#C4E456"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.30025 7.58521C8.59176 7.58521 8.87228 7.67932 9.07856 7.84739C9.28484 8.01545 9.40033 8.24402 9.40033 8.48156V21.0304C9.40033 21.2679 9.28482 21.4965 9.07856 21.6645C8.8723 21.8326 8.59179 21.9267 8.30025 21.9267C7.69247 21.9267 7.2002 21.5256 7.2002 21.0304V8.48158C7.2002 7.98635 7.69247 7.58521 8.30025 7.58521Z"
            fill="#C4E456"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.10006 12.0668C4.39157 12.0668 4.67208 12.1609 4.87837 12.329C5.08465 12.497 5.20013 12.7256 5.20013 12.9631V16.5485C5.20013 16.786 5.08463 17.0146 4.87837 17.1827C4.67211 17.3508 4.39159 17.4449 4.10006 17.4449C3.49228 17.4449 3 17.0437 3 16.5485V12.9631C3 12.4679 3.49228 12.0668 4.10006 12.0668Z"
            fill="#C4E456"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7006 4C16.9922 4 17.2727 4.09411 17.479 4.26218C17.6852 4.43024 17.8007 4.65881 17.8007 4.89636V24.6159C17.8007 24.8534 17.6852 25.082 17.479 25.2501C17.2727 25.4181 16.9922 25.5122 16.7006 25.5122C16.0929 25.5122 15.6006 25.1111 15.6006 24.6159V4.89638C15.6006 4.40115 16.0929 4 16.7006 4Z"
            fill="#C4E456"
          />
        </svg>

        <h1 className=" tracking-[5%] text-[#fffffb]">WAVE</h1>
      </div>

      {session ? (
        <button
          onClick={handleDashboardClick}
          className="flex items-center justify-center px-6 py-[5px] bg-transparent border-[#c4e456] border-2 rounded-full font-semibold text-base hover:bg-white/10 transition-colors"
        >
          <p className=" text-[#c4e456] font-medium text-base">Dashboard</p>
        </button>
      ) : (
        <button
          onClick={handleSignInClick}
          className="flex items-center justify-center px-6 py-[5px] bg-transparent border-[#c4e456] text-white border-2 rounded-full font-semibold text-base hover:bg-white/10 transition-colors"
        >
          <p className="text-base font-medium text-[#c4e456]">Sign In</p>
        </button>
      )}
    </div>
  );
};

export default Navbar;
