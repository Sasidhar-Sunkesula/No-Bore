import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import VideoCard from "./VideoCard";
import React from "react";

const VideoContainer: React.FC = () => {
  const videoList: any[] = useSelector((store: any) => store.videoList.value);
  const sideBar: boolean = useSelector((store: any) => store.menu.value);

  if (videoList.length === 0) return <Shimmer />;

  return (
    <div
      className={`flex justify-evenly flex-wrap ${sideBar ? "w-10/12" : ""}`}
    >
      {videoList.map((card: any, index: number) => (
        <Link to={"/watch/" + card.id} key={index}>
          <VideoCard items={card} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
