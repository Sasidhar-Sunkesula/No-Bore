import { useEffect, useState } from "react";
import { YOUTUBE_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import VideoCard from "./VideoCard";
import { Link, useParams } from "react-router-dom";

const VideoContainer = () => {
  const [videoList, setVideoList] = useState([]);

  const reqId= useParams();

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API_URL);

    const json = await data.json();

    setVideoList(json.items);
  };

  if (videoList.length === 0) return <Shimmer />;
  return (
    <div className="flex w-11/12 justify-center flex-wrap ">
      {videoList.map((card, index) => (
        <Link to={"/watch/"+ card.id} key={index}>
          <VideoCard items={card} />
        </Link>
      ))
      }
    </div>
  );
};

export default VideoContainer;
