/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/menuSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [searchPredictionList, setsearchPredictionList] = useState([]);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatchFun = useDispatch();
  useEffect(() => {
    //make an api call after every key press
    // but if the difference between 2 API calls is <200ms
    // decline that API call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setsearchPredictionList(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleClick = () => {
    dispatchFun(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    //console.log(json[1]);
    setsearchPredictionList(json[1]);

    // Update the cache
    dispatchFun(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  return (
    <div className="relative">
      <div className="flex px-4 py-2 items-center justify-between">
        <div className="flex items-center p-3">
          <img
            onClick={() => handleClick()}
            alt="Hamburger"
            className="w-5 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
          ></img>
          <h1 className="font-bold text-xl text-slate-800 mx-4 cursor-pointer">
            NoBore
          </h1>
        </div>
        <div className="w-2/5 flex">
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            onFocus={() => setshowSuggestions(true)}
            onBlur={() => setshowSuggestions(false)}
            className="w-full py-2 px-4 border border-gray-300 rounded-l-full"
          ></input>
          <button className="border px-4 py-2 border-gray-300 rounded-r-full">
            Search
          </button>
        </div>
        <div>
          <img
            alt="user-icon"
            className="w-14"
            src="data:image/png;base64,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"
          ></img>
        </div>
      </div>
      {searchPredictionList.length > 0 && showSuggestions && (
        <div className="w-1/3 border-2 min-h-0 shadow-lg rounded-lg bg-white p-1 absolute left-1/3">
          <ul>
            {searchPredictionList.map((item) => (
              <li key={item} className="p-2 hover:bg-gray-100 cursor-default">
                🔍 {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
