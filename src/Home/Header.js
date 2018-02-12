import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "../Components";
import {
  HEADER_HEIGHT,
  HEADER_BG_COLOR,
  HEADER_FONT_SIZE,
  ITEM_PADDING
} from "../Constants";

const Header = props => {
  let { sHeaderContainer, sHeaderText } = styles;
  let { onAddPress, onFilterPress, hasFilter } = props;
  return (
    <View style={sHeaderContainer}>
      <Text style={sHeaderText}>TodoApp</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ marginHorizontal: ITEM_PADDING / 2 }}
          iconStyle={{ color: "black" }}
          text={"ADD"}
          onPress={() => onAddPress()}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  sHeaderContainer: {
    height: HEADER_HEIGHT,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: ITEM_PADDING,
    backgroundColor: HEADER_BG_COLOR
  },
  sHeaderText: {
    fontFamily: "Abril Fatface",
    fontSize: HEADER_FONT_SIZE,
    color: "black"
  }
});
