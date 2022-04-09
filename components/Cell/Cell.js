import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Cell = () => {
  //   const isPressed = useSharedValue(false);
  //   const offset = useSharedValue({ x: 0, y: 0 });
  //   const rStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         { translateX: offset.value.x },
  //         { translateY: offset.value.y },
  //         { scale: withSpring(isPressed.value ? 1.2 : 1) },
  //       ],
  //       backgroundColor: isPressed.value ? "yellow" : "blue",
  //     };
  //   });

  //   const start = useSharedValue({ x: 0, y: 0 });
  //   const gesture = Gesture.Pan()
  //     .onBegin(() => {
  //       isPressed.value = true;
  //       start.value = { x: offset.value.x, y: offset.value.y };
  //       console.log("began");
  //     })
  //     .onUpdate((e) => {
  //       offset.value = {
  //         x: e.translationX + start.value.x,
  //         y: e.translationY + start.value.y,
  //       };
  //       console.log("updating");
  //     })
  //     .onFinalize(() => {
  //       isPressed.value = false;
  //     });

  //   const translateX = useSharedValue(0);
  //   const translateXContext = useSharedValue(0);

  //   const rStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{ translateX: translateX.value }],
  //     };
  //   });

  //   const gesture = Gesture.Pan()
  //     .onStart(() => {
  //       translateXContext.value = translateX.value;
  //     })
  //     .onUpdate((e) => {
  //       translateX.value = e.translationX + translateXContext.value;
  //     });

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: positionX.value, y: positionY.value };
    })
    .onUpdate((e) => {
      positionX.value = e.translationX + context.value.x;
      positionY.value = e.translationY + context.value.y;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  return (
    // <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cell, rStyle]}>
          <Text>Cell</Text>
        </Animated.View>
      </GestureDetector>
    // </GestureHandlerRootView>
  );
};

export default Cell;

const styles = StyleSheet.create({
  cell: { width: 100, height: 100, backgroundColor: "red" },
});
