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
import Cell from "../Cell";

const Board = ({ size = 4 }) => {
  const panGesture = Gesture.Pan()
    .onStart((e) => {
      console.log("Started");
      //   console.log(e.velocityX);
      //   console.log(e.velocityY);
      const { velocityX, velocityY } = e;
      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        // horizontal swipe
        if (velocityX > 0) {
          // swipe right
          console.log("Swipe Right");
        } else {
          // swipe left
          console.log("Swipe Left");
        }
      } else {
        // vertical swipe
        if (velocityY > 0) {
          // swipe right
          console.log("Swipe Down");
        } else {
          // swipe left
          console.log("Swipe Up");
        }
      }
    })
    .onUpdate((e) => {
      //   console.log("Updating");
      //   console.log(e.velocityX);
      //   if (e.velocityX > 0) {
      //     console.log("Swipe right");
      //   } else {
      //     console.log("Swipe left");
      //   }
    })
    .onEnd((e) => {
      console.log("Ended");
    });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightgreen",
              width: "100%",
              aspectRatio: 1,
              borderRadius: 15,
              //   height: "100%",
            },
          ]}
        >
          {/* <Cell /> */}
          <View style={{ width: 100, height: 100, backgroundColor: "red" }} />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "blue" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>TEST</Text>
              </View>
            </View>
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Board;

const styles = StyleSheet.create({});
