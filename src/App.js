import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoContainer from "./components/VideoContainer";
import WatchVideo from "./components/WatchVideo";
import { Provider } from "react-redux";
import dataStore from "./utils/dataStore";

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
