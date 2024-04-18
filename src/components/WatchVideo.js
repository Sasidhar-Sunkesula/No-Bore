import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/menuSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchVideo = () => {
  const { reqId } = useParams();

  useEffect(() => {
    closeSideBar();
  }, []);

  const dispatchFun = useDispatch();

  const closeSideBar = () => {
    dispatchFun(closeMenu());
  };

  return (
    <div className="m-4 w-full">
      <div className="flex w-full">
        <iframe
          className="w-2/3"
          height="500"
          src={"https://www.youtube.com/embed/" + reqId}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <LiveChat/>
      </div>
      <div className="w-2/3">
      <CommentsContainer />
      </div>
      
    </div>
  );
};

export default WatchVideo;
