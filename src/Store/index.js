import { compose, createStore, applyMiddleware } from "redux";

import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./Reducers";

const middlewares = [];
middlewares.push(thunk);
//Configuring Redux Logger only for Development
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middlewares))
);

export default store;
