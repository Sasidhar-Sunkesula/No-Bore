import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoContainer from "./components/VideoContainer";
import WatchVideo from "./components/WatchVideo";
import { Provider } from "react-redux";
import dataStore from "./utils/dataStore";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WatchLater from "./components/WatchLater";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <VideoContainer />,
      },
      {
        path: "/watch/:reqId",
        element: <WatchVideo />,
      },
      {
        path: "/watchlater",
        element: <WatchLater />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <Provider store={dataStore}>
        <Header />
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
