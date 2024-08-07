import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionAreaCard from "../components/HomeCard";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function AllVideos() {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/videos/getAllVideos",
          {
            withCredentials: true,
          }
        );
        console.log("Videos from backend:", res.data.data);
        setVideos(res?.data?.data || []);
        setFilteredVideos(res?.data?.data || []);
      } catch (err) {
        console.log("Error fetching videos:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      // Create a regular expression for the search term
      const regex = new RegExp(searchTerm.trim().toLowerCase(), "i");
      const filtered = videos.filter((vid) =>
        regex.test(vid?.title?.trim().toLowerCase())
      );
      console.log("These are the filtered videos:", filtered);
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [searchTerm, videos]);

  return (
    <div>
      {!isLoading ? (
        <div>
          <h1 className="text-3xl font-bold text-white mb-10 p-3">
            {searchTerm && searchTerm.length > 0
              ? `Videos related to "${searchTerm}"`
              : "All Videos"}
          </h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 justify-center flex-wrap">
            {filteredVideos
              ?.slice()
              .reverse()
              .map((vid) => (
                <li
                  key={vid?._id}
                  className="hover:shadow-violet-700 hover:shadow-xl shadow-lg transition shadow-white border-violet-700 p-2 rounded-md"
                >
                  <ActionAreaCard {...vid} />
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-screen">
          <BeatLoader color="red" />
        </div>
      )}
    </div>
  );
}

export default AllVideos;
