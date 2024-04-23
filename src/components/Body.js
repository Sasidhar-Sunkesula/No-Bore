import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux";

const Body = () => {

  const isMenu = useSelector((store)=> store.menu.value);
  
  return (
    <div className="flex">
      {isMenu && <SideBar />}
      <Outlet />
    </div>
  );
};

export default Body;
