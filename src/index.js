import React from "react";
import ReactDOM from "react-dom";
import NotificationSystem, {
  NotificationList
} from "./components/notificationSystem";
import Breweries from "./components/breweries";

function App() {
  return (
    <NotificationSystem>
      <div className="App">
        <NotificationList />
        <h1>React Hooks Experiment</h1>
        <Breweries />
      </div>
    </NotificationSystem>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
