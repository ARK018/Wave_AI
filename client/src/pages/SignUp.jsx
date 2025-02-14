import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import { useAuth } from "../lib/context/AuthContext";

import auth from "../assets/auth.jpg";
import studio from "../assets/studio.jpg";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const { registerUser } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateName = (name) => {
    return name.length >= 2;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMailError("");
    setPasswordError("");
    setNameError("");

    // Validate name
    if (!validateName(name)) {
      setNameError("Name must be at least 2 characters long");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setMailError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    const userInfo = { name, email, password };
    await registerUser(userInfo);
  };

  return (
    <div>
      <AuthNavbar />
      <div className="bg-[#131315] flex justify-center items-center w-full h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center justify-center w-1/2 h-full px-[180px]">
          <div className="items-start w-full pb-8">
            <h1 className="font-Inter text-3xl text-left tracking-[5%] text-white">
              Wave
            </h1>
            <p className="text-white/60">
              Join Us and Capture, Organize, and Elevate Your Ideas.
            </p>
          </div>
          <div className="flex flex-col w-full">
            <form className="space-y-6">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="mb-1 text-sm font-medium text-white/40"
                >
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  placeholder="John Doe"
                  className="py-2 text-white bg-transparent border-b border-white/10 focus:outline-none pl "
                />
                {nameError && (
                  <p className="text-sm text-red-500">{nameError}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="mb-1 text-sm font-medium text-white/40"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="john@gmail.com"
                  className="py-2 text-white bg-transparent border-b border-white/10 focus:outline-none pl "
                />
                {mailError && (
                  <p className="text-sm text-red-500">{mailError}</p>
                )}
              </div>
              <div className="relative flex flex-col w-full">
                <label
                  htmlFor="password"
                  className="mb-1 text-sm font-medium text-white/40"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="••••••••"
                  className="py-2 text-white bg-transparent border-b border-white/10 focus:outline-none pl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 rounded right-3 top-9"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
              <button
                onClick={handleSignUp}
                className="w-full py-2 text-black bg-[#c4e456] rounded-full"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="relative w-1/2 h-full">
          <img
            src={studio}
            alt="auth-image"
            className="inset-0 object-cover w-full h-full absoute p-4 rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
