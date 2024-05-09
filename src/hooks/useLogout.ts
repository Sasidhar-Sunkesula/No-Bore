import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { setsubscriptionsList } from "../utils/subscriptionsSlice";
import { watchList } from "../utils/watchLater";

interface LogoutHook {
  handleLogout: () => void;
}

export const useLogout = (): LogoutHook => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch(setsubscriptionsList([]));
    dispatch(watchList([]));
    dispatch(logout());
  };

  return { handleLogout };
};
