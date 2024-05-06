import { useDispatch, useSelector } from "react-redux";
import { removeFromSubscriptionsList } from "../utils/subscriptionsSlice";
import EmptyWatchList from "./EmptyWatchList";

const Subscriptions = () => {
  const dispatchFun = useDispatch();
  const subscriptionsList = useSelector((store) => store.subscriptions.value);
  const user = JSON.parse(localStorage.getItem("user"));
  const remove = async (item) => {
    const index = subscriptionsList.findIndex((channel) => channel === item);
    dispatchFun(removeFromSubscriptionsList(index));
    await fetch("http://localhost:4000/api/subscriptions/removeFromList", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        email: user.email,
        channelName: item,
      }),
    });
  };

  if (subscriptionsList.length === 0) {
    return <EmptyWatchList message="No subscriptions yet" />;
  }

  return (
    <div className="w-full ">
      <h1 className="text-2xl w-1/2 mx-auto text-center p-4 font-bold">
        Subscriptions
      </h1>
      <div className="h-fit w-4/5 mx-auto grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2 p-7 my-1">
        {subscriptionsList.map((channel) => (
          <div className="flex-shrink-0  border rounded-lg shadow-sm h-fit py-5 pl-5 pr-10 group block">
            <div className="flex wrap items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      alt="user"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <h3 className="font-semibold dark:text-white text-gray-800">
                  {channel}
                </h3>
              </div>
              <button
                onClick={() => remove(channel)}
                className="btn rounded-badge dark:hover:bg-gray-600 dark:text-white btn-outline"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
