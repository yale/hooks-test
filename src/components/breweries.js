import React, { useEffect, useContext } from "react";
import { NotificationContext } from "../components/notificationSystem";
import useApi from "../hooks/useApi";

export default function Breweries() {
  const [breweries, refresh] = useApi(
    "https://api.openbrewerydb.org/breweries"
  );

  const [_, notificationActions] = useContext(NotificationContext);

  if (breweries.error) {
    return <p>{breweries.error.message}</p>;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refresh()
        .then(() => {
          notificationActions.notify("Refreshed!");
        })
        .catch(error => notificationActions.notify(error.message, "error"));
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <p>
      {breweries.loaded
        ? `There are ${breweries.data.length} breweries`
        : "Loading..."}
    </p>
  );
}
