import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.menu.value);
  const location = useLocation();
  if (isMenuOpen === false) {
    return null;
  }

  return (
    <div className="flex-col font-semibold w-2/12 items-center justify-center px-2 py-4 shadow-md rounded-lg">
      <ul className=" w-full mt-2">
        <Link to={"/"}>
        <li className={`text-left px-14 py-2 rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 ${location.pathname === '/' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            Home
          </li>
        </Link>
        <Link to={"/watchlater"}>
        <li className={`text-left mt-1 rounded-lg dark:hover:bg-gray-700 px-14 py-2 hover:bg-gray-100 ${location.pathname === '/watchlater' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            Watchlater
          </li>
        </Link>
        <Link to={"/subscriptions"}>
        <li className={`text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100 ${location.pathname === '/subscriptions' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            Subscriptions
          </li>
        </Link>
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Shorts
        </li>
      </ul>
      <hr></hr>
      <ul className=" mt-4">
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Treding
        </li>
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Shopping
        </li>
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Music
        </li>
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Movies
        </li>
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Live
        </li>
        <li className="text-left mt-1 px-14 rounded-lg dark:hover:bg-gray-700 py-2 hover:bg-gray-100">
          Gaming
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
