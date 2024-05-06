import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromList } from "../utils/watchLater";
import EmptyWatchList from "./EmptyWatchList";

const Watchlater = () => {
  const dispatchFun = useDispatch();
  const watchListFromStore = useSelector((store) => store.watchLater.value);
  const user = JSON.parse(localStorage.getItem("user"));
  const remove = async (item) => {
    const index = watchListFromStore.findIndex((video) => video.id === item.id);
    dispatchFun(removeFromList(index));
    await fetch(
      `http://localhost:4000/api/watchList/removeFromList/${user.email}/${item.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  if (user === null) {
    return <EmptyWatchList message="You need to login"/>;
  }
  if (watchListFromStore.length === 0) {
    return <EmptyWatchList message="No videos in watch later yet"/>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl w-1/2 mx-auto text-center p-4 font-bold">Watch Later</h1>
      {watchListFromStore.map((item) => (
        
        <div className="card dark:bg-gray-700 dark:text-white mt-3 w-11/12 mx-auto card-side bg-base-100 shadow-xl">
          <figure>
            <img src={item.snippet.thumbnails.medium.url} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.snippet.title}</h2>
            <p className="font-semibold mt-2">{item.snippet.channelTitle}</p>
            <div className="card-actions gap-4 justify-end">
            <Link to={`/watch/${item.id}`}><button className="btn btn-primary">Watch Now</button></Link>
              <button onClick={() => remove(item)} className="btn btn-primary">
                Remove
              </button>
            </div>
          </div>
        </div>
        // 
      ))}
    </div>
  );
};

export default Watchlater;
