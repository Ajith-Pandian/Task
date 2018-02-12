import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import moment from "moment";

import { Button } from "../Components";

const TodoItem = ({ todo, onPress }) => {
  let { sContainer, sTitle, sDescription, sTime, sActionLayout } = styles;
  let { title, description, time } = todo;
  return (
    <TouchableOpacity onPress={() => onPress()} style={sContainer}>
      <View style={{ flex: 4 }}>
        <Text maxLength={20} numberOfLines={1} style={sTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={sDescription}>
          {description}
        </Text>
        <Text style={sTime}>{moment(time).calendar()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  sContainer: {
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sTitle: {
    color: "black"
  },
  sDescription: {
    marginTop: 5
  },
  sTime: {
    marginTop: 5
  }
});
