import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const cellColors = {
  2: "#CC99C9",
  4: "#9EC1CF",
  8: "#9EE09E",
  16: "#FDFD97",
  32: "#FEB144",
  64: "#FF6663",
  128: "#C7CEEA",
  256: "#B5EAD7",
  512: "#FFDAC1",
  1024: "#FFB7B2",
  2048: "#FF9AA2",
};

const Cell = ({ value = 0, x = 0, y = 0 }) => {
  const cellScale = useSharedValue(0);

  useEffect(() => {
    cellScale.value = withTiming(1, { duration: 300 });
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: value === 2 ? cellScale.value : 1,
        },
      ],
    };
  });

  return (
    <Animated.View
      layout={Layout.delay(3000)}
      style={[
        styles.cell,
        {
          backgroundColor: cellColors[value],
        },
        // rStyle,
      ]}
    >
      <View
        style={{
          // backgroundColor: "blue",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            flexDirection: "row",
            fontSize: 28,
          }}
        >
          {value ? value : ""}
        </Text>
      </View>
    </Animated.View>
  );
};

export default Cell;

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: "plum",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
