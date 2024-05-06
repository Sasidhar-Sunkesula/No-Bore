import Header from "./components/Header";
import Body from "./components/Body";
import VideoContainer from "./components/VideoContainer";
import WatchVideo from "./components/WatchVideo";
import { Provider } from "react-redux";
import dataStore from "./utils/dataStore";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WatchLater from "./components/WatchLater";
import Subscriptions from "./components/Subscriptions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={dataStore}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<VideoContainer />} />
              <Route path="/watch/:reqId" element={<WatchVideo />} />
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
