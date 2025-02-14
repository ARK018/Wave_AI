import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PodcastDialog from "@/components/PodcastDialog";
import { usePodcasts } from "../lib/context/PodcastContext";
import { useNavigate } from "react-router-dom";

const Feature2 = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userSession"))
  );

  const { podcasts, loading } = usePodcasts();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-[#131315] p-8 w-full">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Hello,{" "}
            <span className="text-[#c4e456] transition-colors duration-300 hover:text-[#d4ec80]">
              {user.name}
            </span>
          </h1>
        </header>

        {/* Podcasts Section */}
        <section className="w-full pt-5">
          <h2 className="text-xl font-semibold text-white/80 mb-5">
            Your Podcasts
          </h2>
          <div className="w-full grid grid-cols-4 gap-8">
            {/* Create New Podcast Button */}
            <Dialog>
              <DialogTrigger>
                <div className="cursor-pointer text-white/40 hover:text-[#c4e456]/80 flex flex-col justify-center items-center gap-2 w-full h-full border-dashed border-2 border-white/40 hover:border-[#c4e456]/80 rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 256 256"
                    className="fill-current"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
                  </svg>
                  <h1>Create a New Podcast</h1>
                </div>
              </DialogTrigger>
              <PodcastDialog />
            </Dialog>

            {/* Show Skeletons while loading */}
            {loading
              ? [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="relative bg-black/20 backdrop-blur-sm rounded-xl h-[167px] animate-pulse overflow-hidden border border-[#c4e456]/20 p-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-[150px] h-[150px] bg-gray-700/50 rounded-[18px]"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-6 bg-gray-700/50 w-3/4 rounded mb-2"></div>
                        <div className="h-4 bg-gray-700/50 w-5/6 rounded mb-1"></div>
                        <div className="h-4 bg-gray-700/50 w-4/5 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-700/50 w-1/2 rounded mt-4"></div>
                  </div>
                ))
              : podcasts.map((podcast, index) => (
                  <div
                    key={podcast.id || index}
                    className="flex flex-col w-fill h-fit relative cursor-pointer group bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden  transition-all duration-300 border border-[#c4e456]/20 hover:border-[#c4e456]/40 p-5 gap-2"
                  >
                    {/* Podcast Image */}
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={podcast.thumbnail}
                        alt={podcast.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Podcast Details */}
                    <div className="mt-2">
                      <h3 className="text-lg font-bold text-[#c4e456] mb-1 group-hover:text-white transition-colors duration-300">
                        {podcast.title}
                      </h3>
                      <p className="text-gray-400 text-sm w-full line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                        {podcast.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Feature2;
