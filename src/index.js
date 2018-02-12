import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";

import store from "./Store";
import HomeScreen from "./Home";
import DetailsScreen from "./Details";
import { Loader } from "./Components/";

const StackApp = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
});

const ReduxApp = () => (
  <Provider store={store}>
    <StackApp />
  </Provider>
);

export default ReduxApp;
