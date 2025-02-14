import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import proxy from "../assets/Proxy.jpg";
import { databases } from "../lib/appwrite";

const Feature1 = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const navigate = useNavigate();
  const scrollRefs = useRef({});

  useEffect(() => {
    getPodcasts();
  }, []);

  const getPodcasts = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_PODCASTS
      );
      console.log(response.documents);
      setPodcasts(response.documents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let filtered = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(search.toLowerCase()) ||
        podcast.createrName.toLowerCase().includes(search.toLowerCase()) // Fix: use correct key
    );
    if (genreFilter) {
      filtered = filtered.filter((podcast) => podcast.genre === genreFilter);
    }
    setFilteredPodcasts(filtered);
  }, [search, genreFilter, podcasts]); // Fix: Add podcasts dependency

  const scrollContainer = (genre, direction) => {
    const ref = scrollRefs.current[genre];
    if (ref) {
      const scrollAmount = 300;
      ref.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#131315] p-8 w-full flex flex-col items-center">
      <div className="flex justify-between w-full max-w-6xl mb-6">
        <input
          type="text"
          placeholder="Search podcasts..."
          className="p-2 w-1/2 rounded bg-[#1c1c1e] text-white border border-[#c4e456]/40"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded bg-[#1c1c1e] text-white border border-[#c4e456]/40"
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">All Genres</option>
          {[...new Set(podcasts.map((p) => p.genre))].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-12 w-full max-w-6xl">
        {Object.entries(
          filteredPodcasts.reduce((acc, podcast) => {
            acc[podcast.genre] = acc[podcast.genre] || [];
            acc[podcast.genre].push(podcast);
            return acc;
          }, {})
        ).map(([genre, podcasts]) => {
          if (!scrollRefs.current[genre]) {
            scrollRefs.current[genre] = React.createRef();
          }

          return (
            <div key={genre} className="w-full relative group">
              <h2 className="text-xl font-semibold text-white/80 mb-4">
                {genre}
              </h2>
              <div
                ref={scrollRefs.current[genre]}
                className="flex space-x-6 overflow-hidden scrollbar-hide px-2 pb-2 w-full"
              >
                {podcasts.slice(0, 6).map((podcast) => (
                  <div
                    key={podcast.$id}
                    onClick={() => navigate("../podcast")}
                    className="w-[30%] flex-shrink-0 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-[#c4e456]/20 hover:border-[#c4e456]/40 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                  >
                    <img
                      src={podcast.thumbnail || proxy}
                      alt={podcast.title}
                      className="w-full h-60 object-cover rounded-lg mb-4"
                      onError={(e) => (e.target.src = proxy)}
                    />
                    <h3 className="text-[#c4e456] font-bold text-lg truncate">
                      {podcast.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      By {podcast.createrName}
                    </p>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {podcast.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => scrollContainer(genre, "left")}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => scrollContainer(genre, "right")}
              >
                <ChevronRight size={32} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature1;
