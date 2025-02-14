import { ID } from "appwrite";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";
import React, { createContext, useState, useEffect, useContext } from "react";
import { databases } from "../appwrite";
import { Query } from "appwrite";

const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("userSession"));

  useEffect(() => {
    getPodcasts();
  }, []);

  const getPodcasts = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_PODCASTS
        // [Query.equal("createrId", user.$id)]
      );
      localStorage.setItem("podcasts", JSON.stringify(response.documents));
      setPodcasts(response.documents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPodcast = async (podcastInfo) => {
    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_PODCASTS,
        {
          ...podcastInfo,
          createrId: user.$id,
        }
      );
      getPodcasts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PodcastContext.Provider value={{ podcasts, loading, getPodcasts }}>
      {children}
    </PodcastContext.Provider>
  );
};

export const usePodcasts = () => {
  return useContext(PodcastContext);
};
