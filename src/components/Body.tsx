import React, { useEffect } from "react";
import { YOUTUBE_API_URL } from "../utils/constants";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "../utils/videoListSlice";
import { watchList } from "../utils/watchLater";
import { setsubscriptionsList } from "../utils/subscriptionsSlice";
import SideBar from "./SideBar";

const Body: React.FC = () => {
  const isMenu = useSelector((store: any) => store.menu.value);
  const dispatchFun = useDispatch();

  const user = JSON.parse(localStorage.getItem("user")!);
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API_URL);
    const json = await data.json();
    dispatchFun(setList(json.items));
  };

  const getWatchList = async () => {
    const data = await fetch(
      `https://nobore-backend.onrender.com/api/watchList/${user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const response = await data.json();
    const videos = response.map((obj: any) => obj.video);
    dispatchFun(watchList(videos));
  };

  const getSubscriptions = async () => {
    const data = await fetch(
      `https://nobore-backend.onrender.com/api/subscriptions/${user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const response = await data.json();
    const subscriptionList = response.map((doc: any) => doc.channelName);
    dispatchFun(setsubscriptionsList(subscriptionList));
  };

  useEffect(() => {
    getVideos();
    if (user && user.email) {
      getWatchList();
      getSubscriptions();
    }
  }, []);

  return (
    <div className="min-h-[90vh] w-full dark:bg-gray-800 dark:text-white font-mukta flex">
      {isMenu && <SideBar />}
      <Outlet />
    </div>
  );
};

export default Body;
