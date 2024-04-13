import {useSelector} from "react-redux";

const SideBar = () =>{

    const isMenuOpen = useSelector((store)=> store.menu.value);

    if(isMenuOpen=== false){
        return null;
    }

    return (
        <div className="flex-col  w-48 items-center justify-center p-4 shadow-md rounded-lg">
            <ul className="p-4 mt-2">
                <li className="m-1" >Home</li>
                <li className="m-1">Shorts</li>
                <li className="m-1">Subscriptions</li>
            </ul>
            <hr></hr>
            <ul  className="p-4 mt-2">
                <li className="m-1">Treding</li>
                <li className="m-1">Shopping</li>
                <li className="m-1">Music</li>
                <li className="m-1">Movies</li>
                <li className="m-1">Live</li>
                <li className="m-1">Gaming</li>
            </ul>
        </div>
    )
}

export default SideBar;