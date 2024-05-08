import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu } from "../utils/menuSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { useNavigate } from "react-router-dom";
import { addToList, removeFromList } from "../utils/watchLater";
import VideoPlayer from "./VideoPlayer";
import VideoDetails from "./VideoDetails";
import {
  addToSubscriptionsList,
  removeFromSubscriptionsList,
} from "../utils/subscriptionsSlice";
import { formatCount } from "../utils/helper";

const WatchVideo = () => {
  const [video, setVideo] = useState(null);
  const { reqId } = useParams();
  const user = useSelector((store) => store.user.user);
  const videoList = useSelector((store) => store.videoList.value);
  const [isLoading, setIsLoading] = useState(true);
  const watchListFromStore = useSelector((store) => store.watchLater.value);
  const subscriptionsList = useSelector((store) => store.subscriptions.value);
  const navigate = useNavigate();
  const dispatchFun = useDispatch();
  const [index, setIndex] = useState(-1);
  const [subscribedIndex, setSubscribedIndex] = useState(-1);

  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const closeSideBar = useCallback(() => {
    dispatchFun(closeMenu());
  }, [dispatchFun]);

  useEffect(() => {
    closeSideBar();
    const selectedVideo = videoList.find((item) => item.id === reqId);
    if (selectedVideo) {
      setVideo(selectedVideo);
      const indexFromStore = watchListFromStore.findIndex(
        (obj) => obj.id === selectedVideo.id
      );
      setIndex(indexFromStore);
      const channelIndexFromStore = subscriptionsList.findIndex(
        (channelName) => channelName === selectedVideo.snippet.channelTitle
      );
      setSubscribedIndex(channelIndexFromStore);
    }
    setIsLoading(false);
    return () => {
      dispatchFun(openMenu());
    };
  }, [
    closeSideBar,
    dispatchFun,
    reqId,
    subscriptionsList,
    videoList,
    watchListFromStore,
  ]);

  const addToWatchlist = async () => {
    if (!userFromStorage) {
      navigate("/login");
      return;
    }
    if (index === -1) {
      dispatchFun(addToList(video));
      await fetch("https://nobore-backend.onrender.com/api/watchList", {
        method: "POST",
        body: JSON.stringify({ email: user.email, video }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } else {
      removeFromWatchlist();
    }
  };
  const removeFromWatchlist = async () => {
    dispatchFun(removeFromList(index));
    await fetch(
      `https://nobore-backend.onrender.com/api/watchList/removeFromList/${user.email}/${video.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  const addToSubscriptions = async () => {
    if (!userFromStorage) {
      navigate("/login");
      return;
    }
    if (subscribedIndex === -1) {
      dispatchFun(addToSubscriptionsList(video.snippet.channelTitle));
      await fetch("https://nobore-backend.onrender.com/api/subscriptions", {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          channelName: video.snippet.channelTitle,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } else {
      removeFromSubscriptions();
    }
  };

  const removeFromSubscriptions = async () => {
    dispatchFun(removeFromSubscriptionsList(subscribedIndex));
    await fetch("https://nobore-backend.onrender.com/api/subscriptions/removeFromList/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        email: user.email,
        channelName: video.snippet.channelTitle,
      }),
    });
  };

  if (!video || isLoading) {
    return <span className="loading mx-auto loading-spinner loading-lg"></span>;
  }
  const { viewCount, likeCount } = video.statistics;
  return (
    <div className="m-4 dark:bg-gray-800 dark:text-white text-black w-full">
      <div className="flex w-full">
        <VideoPlayer reqId={reqId} />
        <LiveChat />
      </div>
      <div className="w-2/3">
        <VideoDetails video={video} />
        <div className="flex py-3 px-4 items-center justify-between">
          <div className="font-bold w-7/12 justify-between items-center flex gap-2">
            <div className="flex gap-x-2">
              <img src="/userIcon.svg" alt="user-icon"></img>
              <p className="text-xl font-extrabold">
                {video.snippet.channelTitle}
              </p>
            </div>
            <div className="flex justify-between gap-x-3 items-center">
              <div className="badge p-4 badge-outline">
                {formatCount(viewCount)} views
              </div>
              <div className="badge p-4 badge-outline">
                {formatCount(likeCount)} likes
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => addToWatchlist(video)} className="btn mr-4">
              {index !== -1 ? "Added to watchlist" : "Add to watchlater"}
              <img className="w-6 h-6" src="/heart.svg" alt="heart"></img>
            </button>
            <button
              className="btn dark:bg-gray-600 dark:text-white btn-outline"
              onClick={() => addToSubscriptions()}
            >
              {subscribedIndex !== -1 ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        </div>
        <CommentsContainer count={viewCount} />
      </div>
    </div>
  );
};

export default WatchVideo;
