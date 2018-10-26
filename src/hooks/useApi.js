import { useReducer, useEffect } from "react";

export default (endpoint, opts = {}) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "request":
          return { ...state, loading: true };
        case "success":
          return {
            ...state,
            loading: false,
            loaded: true,
            data: action.payload
          };
        case "failure":
          return {
            ...state,
            loading: false,
            error: action.payload
          };
        default:
          return state;
      }
    },
    { loading: false, loaded: false, data: null, error: null }
  );

  const { method = "GET", payloadFromJSON } = opts;

  const makeCall = async () => {
    dispatch({ type: "request" });
    fetch(endpoint, { method })
      .then(res => res.json())
      .then(json => {
        const data = payloadFromJSON ? payloadFromJSON(json) : json;
        dispatch({ type: "success", payload: data });
        return data;
      })
      .catch(error => dispatch({ type: "error", payload: error }));
  };

  useEffect(makeCall, [endpoint]);

  return [state, makeCall];
};
