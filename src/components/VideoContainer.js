import Shimmer from "./Shimmer";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const videoList = useSelector((store) => store.videoList.value);
  const sideBar = useSelector((store)=> store.menu.value);

  if (videoList.length === 0) return <Shimmer />;
  return (
    <div className={`w-12/12 mx-auto grid grid-cols-1 justify-items-center ${!sideBar ? 'md:grid-cols-4 justify-items-center ' : 'md:grid-cols-3 justify-items-center gap-x-6'}` }>
      {videoList.map((card, index) => (
        <Link to={"/watch/" + card.id} key={index}>
          <VideoCard items={card} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
