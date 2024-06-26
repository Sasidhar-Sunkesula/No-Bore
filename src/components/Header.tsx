import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenu } from "../utils/menuSlice";
import { cacheResults } from "../utils/searchSlice";
import { login } from "../utils/userSlice";
import { useLogout } from "../hooks/useLogout";
import { YOUTUBE_SEARCH_API } from "../utils/constants";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [searchPredictionList, setSearchPredictionList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchCache = useSelector((store: any) => store.search);
  const user = useSelector((store: any) => store.user.user);
  const dispatch = useDispatch();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSearchPredictionList(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    dispatch(login(user));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSearchPredictionList(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  return (
    <div className=" dark:bg-gray-800 w-full dark:text-white">
      <div className="flex px-8 py-2 items-center w-full justify-between">
        <div className="Hamburger-Logo flex items-center p-3">
          <label className="btn  btn-circle swap swap-rotate">
            <input type="checkbox" onClick={() => handleClick()} />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
          <Link to="/">
            <h1 className="font-bold text-xl  mx-4 cursor-pointer">NoBore</h1>
          </Link>
        </div>
        <div className="flex flex-col w-2/5 relative">
          <div className="Input-Button w-full relative flex">
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              className="w-full dark:bg-gray-800 py-2 px-4 border border-gray-300 rounded-l-full"
            />
            <button className="border px-6 py-2 border-gray-300 rounded-r-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {searchPredictionList.length > 0 && showSuggestions && (
            <div className="w-full border-2 dark:bg-gray-800  min-h-0 shadow-lg rounded-lg bg-white p-1 absolute top-12">
              <ul>
                {searchPredictionList.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 flex gap-4 font-mukta dark:hover:bg-gray-700 hover:bg-gray-100 cursor-default"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="Theme-Email-Login-Logout flex gap-4">
          <label className="swap swap-rotate">
            <input
              onClick={() => toggle()}
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <nav>
            {user ? (
              <div>
                <div className="badge p-6 mr-3 badge-outline">{user.email}</div>
                <button
                  className="btn dark:bg-gray-600 dark:text-white btn-outline"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <button className="btn dark:bg-gray-600 dark:text-white btn-outline">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn dark:bg-gray-600 dark:text-white btn-outline">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
