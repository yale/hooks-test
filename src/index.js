import React, { useEffect } from "react";
import useApi from "./hooks/useApi";
import ReactDOM from "react-dom";

function App({ currentLocation }) {
  const [breweries, refresh] = useApi(
    "https://api.openbrewerydb.org/breweries",
    {
      refetch: currentLocation
    }
  );

  if (breweries.error) {
    return <p>{breweries.error.message}</p>;
  }

  useEffect(() => {
    const interval = setInterval(() => refresh(), 10000);

    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <h1>React Hooks Experiment</h1>
      <p>
        {breweries.loaded
          ? `There are ${breweries.data.length} breweries`
          : "Loading..."}
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
