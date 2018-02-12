import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Button = props => {
  let { onPress, style, text, textStyle } = props;
  return (
    <TouchableOpacity onPress={() => onPress()} style={[{ margin: 5 }, style]}>
      <Text style={textStyle}>{text || "Button"}</Text>
    </TouchableOpacity>
  );
};

export default Button;
