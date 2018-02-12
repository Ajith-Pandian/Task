import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";

import {
  HEADER_HEIGHT,
  HEADER_BG_COLOR,
  HEADER_FONT_SIZE,
  ITEM_PADDING
} from "../Constants";

import { Button } from "../Components";

const Header = props => {
  let {
    onBackPress,
    onEditPress,
    onSavePress,
    onCancelPress,
    onDeletePress,
    onAddChild,
    title,
    headerStyle,
    isEdit
  } = props;
  let { sHeaderContainer, sHeaderTitle } = styles;

  return (
    <View style={{ backgroundColor: HEADER_BG_COLOR }}>
      <View style={sHeaderContainer}>
        <Button
          style={{ paddingHorizontal: ITEM_PADDING }}
          text={"BACK"}
          onPress={() => onBackPress()}
        />
        <View style={{ flexDirection: "row" }}>
          {!isEdit ? (
            <Button
              text={"ADD"}
              onPress={() => onAddChild()}
              style={{ marginHorizontal: ITEM_PADDING }}
            />
          ) : null}
          {!isEdit ? (
            <Button
              text={"DELETE"}
              onPress={() => onDeletePress()}
              style={{ marginHorizontal: ITEM_PADDING }}
            />
          ) : null}
          <Button
            text={isEdit ? "SAVE" : "EDIT"}
            onPress={() => (isEdit ? onSavePress() : onEditPress())}
            style={{ marginHorizontal: ITEM_PADDING }}
          />
          {isEdit ? (
            <Button
              text={"CANCEL"}
              onPress={() => onCancelPress()}
              style={{ marginHorizontal: ITEM_PADDING }}
            />
          ) : null}
        </View>
      </View>
      {!isEdit ? (
        <Text style={sHeaderTitle} numberOfLines={3}>
          {title || "New Todo"}
        </Text>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  sHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  sHeaderTitle: {
    marginHorizontal: 3 * ITEM_PADDING,
    paddingBottom: 10,
    fontSize: HEADER_FONT_SIZE,
    color: "black",
    fontFamily: "Abril Fatface"
  }
});
