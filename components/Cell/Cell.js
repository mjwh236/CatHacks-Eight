import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Cell = ({ value = 0, x = 0, y = 0 }) => {
  const cellScale = useSharedValue(0);

  useEffect(() => {
    cellScale.value = withTiming(1, { duration: 300 });
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: cellScale.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.cell,
        // rStyle
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
