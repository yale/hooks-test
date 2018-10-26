import React, { useReducer, useContext } from "react";
import uuidv4 from "uuid/v4";

export const NotificationContext = React.createContext([]);

export const NotificationList = () => {
  const [notifications, actions] = useContext(NotificationContext);

  return (
    <ul>
      {notifications.map(notification => (
        <li key={notification.id}>
          {notification.message}{" "}
          <a onClick={() => actions.remove(notification.id)}>x</a>
        </li>
      ))}
    </ul>
  );
};

export default ({ children }) => {
  const [notifications, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "notify":
        return [
          ...state,
          {
            id: uuidv4(),
            message: action.payload.message,
            type: action.payload.type
          }
        ];
      case "remove":
        return state.filter(({ id }) => id !== action.payload);
      default:
        return state;
    }
  }, []);

  const notify = (message, type = "notice") =>
    dispatch({ type: "notify", payload: { message, type } });

  const remove = id => dispatch({ type: "remove", payload: id });

  return (
    <NotificationContext.Provider value={[notifications, { notify, remove }]}>
      {children}
    </NotificationContext.Provider>
  );
};
