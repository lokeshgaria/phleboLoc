import React from "react";
import ReactDOM from "react-dom";
import MapWithADirectionsRenderer from "./App";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reedux/store"
ReactDOM.render(
  <React.Fragment>
    <Provider store={store} >
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
