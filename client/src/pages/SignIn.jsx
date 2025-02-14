import { useState, useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";
import { useAuth } from "../lib/context/AuthContext";

import auth from "../assets/auth.jpg";
import studio from "../assets/studio.jpg";

import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const { user, loginUser } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMailError("");
    setPasswordError("");

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

    const userInfo = { email, password };
    await loginUser(userInfo);
  };

  return (
    <div>
      <AuthNavbar />
      <div className="bg-[#131315] flex justify-center items-center w-full h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center justify-center w-1/2 h-full px-[180px]">
          <div className="items-start w-full pb-8">
            <h1 className="text-white font-Inter text-3xl text-left tracking-[5%]">
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
                  className="py-2 text-white bg-transparent border-b border-white/10 focus:outline-none pl"
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
                  className="py-2 text-white bg-transparent border-b focus:outline-none pl border-white/10"
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
                onClick={handleSignIn}
                className="w-full py-2 text-black bg-[#c4e456] rounded-full"
              >
                Sign In
              </button>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
          </div>
        </div>
        <div className="relative w-1/2 h-full">
          <img
            src={studio}
            alt="auth-image"
            className="inset-0 object-cover w-full h-full p-4 rounded-[32px] absoute"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
