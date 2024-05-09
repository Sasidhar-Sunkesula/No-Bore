import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import dataStore from "./utils/dataStore";
import Header from "./components/Header";
import Body from "./components/Body";
import VideoContainer from "./components/VideoContainer";
import WatchVideo from "./components/WatchVideo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WatchLater from "./components/WatchLater";
import Subscriptions from "./components/Subscriptions";

function App() {
  return (
    <div className="App">
      {/* Wrap the entire application with the Redux Provider */}
      <Provider store={dataStore}>
        {/* Use BrowserRouter for routing */}
        <Router>
          {/* Include the Header component */}
          <Header />
          {/* Define route configuration using Routes */}
          <Routes>
            {/* Define the base route */}
            <Route path="/" element={<Body />}>
              {/* Nested routes for different pages */}
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
