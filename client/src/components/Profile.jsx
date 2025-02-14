import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import profile from "@/assets/profile.jpg";
import { useAuth } from "../lib/context/AuthContext";

const TabButton = ({ isActive, onClick, children }) => (
  <div
    className={`py-2 px-2 text-base w-full rounded-[6px] cursor-pointer transition-colors ${
      isActive ? "bg-[#c4e456]/10 text-[#c4e456]" : "text-white"
    }`}
    onClick={onClick}
  >
    {children}
  </div>
);

const FormInput = ({ label, type, value, onChange, placeholder, error }) => (
  <div className="flex flex-col w-full">
    <label className="mb-1 text-sm font-medium text-[#c4e456]">{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="py-[6px] text-white bg-transparent rounded-[6px] border border-[#c4e456]/20 focus:outline-none focus:border-[#c4e456] pl-2 placeholder-white/40"
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const ProfileTab = ({
  name,
  email,
  setName,
  setEmail,
  photo,
  handlePhotoChange,
  mailError,
}) => (
  <div className="flex flex-col gap-6 p-4 w-2/3">
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={photo}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="absolute bottom-0 right-0 bg-[#c4e456] rounded-full p-2 cursor-pointer hover:bg-[#c4e456]/80">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#131315"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.83A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          </svg>
        </label>
      </div>
    </div>
    <FormInput
      label="Name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="John Doe"
    />
    <FormInput
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="john@gmail.com"
      error={mailError}
    />
  </div>
);

const SecurityTab = ({
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  passwordError,
  handlePasswordChange,
}) => (
  <div className="flex flex-col gap-6 p-4 w-2/3">
    <FormInput
      label="Current Password"
      type="password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
    />
    <FormInput
      label="New Password"
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <FormInput
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      error={passwordError}
    />
    <button
      onClick={handlePasswordChange}
      className="w-full py-2 text-[#131315] bg-[#c4e456] rounded-full hover:bg-[#c4e456]/80 transition-colors"
    >
      Update
    </button>
  </div>
);

const Profile = () => {
  const { logoutUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(
    () => localStorage.getItem("userPhoto") || profile
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userSession"))
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleLogoutClick = () => {
    logoutUser();
    localStorage.removeItem("selected");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result;
        setPhoto(photoData);
        localStorage.setItem("userPhoto", photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    setPasswordError("");
    // Add password update logic here
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={photo}
            alt="profile-photo"
            className="w-full h-full object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#131315] text-white">
        <DialogTitle className="mb-4">Profile Settings</DialogTitle>
        <div className="flex py-4">
          <div className="flex flex-col w-1/3 border-r border-[#c4e456]/20 px-2 justify-between">
            <div>
              <TabButton
                isActive={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </TabButton>
              <TabButton
                isActive={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              >
                Security
              </TabButton>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="mt-52 cursor-pointer text-[#c4e456]/60 hover:text-[#c4e456]"
              onClick={handleLogoutClick}
            >
              <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
            </svg>
          </div>

          {activeTab === "profile" ? (
            <ProfileTab
              name={name}
              email={email}
              setName={setName}
              setEmail={setEmail}
              photo={photo}
              handlePhotoChange={handlePhotoChange}
              mailError={mailError}
            />
          ) : (
            <SecurityTab
              currentPassword={currentPassword}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              setCurrentPassword={setCurrentPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              passwordError={passwordError}
              handlePasswordChange={handlePasswordChange}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
