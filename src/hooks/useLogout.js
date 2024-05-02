import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch(logout());
    
  };

  return { handleLogout };
};
