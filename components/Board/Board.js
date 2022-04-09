import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Cell from "../Cell";

const initialCells = [
  [0, 0, 0, 0],
  [0, 9999, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const Board = ({ size = 4 }) => {
  const [cells, setCells] = useState(initialCells);

  const updateBoardOnJS = (newBoard) => {
    console.log("you updated the board from the JS thread");
    setCells(newBoard);
  };

  useEffect(() => {
    const x = getRandomInt(0, size);
    const y = getRandomInt(0, size);
    // copy 2d array
    const copy = cells.map((arr) => arr.slice());
    copy[x][y] = 2;
    setCells(copy);
  }, []);

  const addNewValue = (board) => {
    let x = getRandomInt(0, size);
    let y = getRandomInt(0, size);
    const copy = board.map((arr) => arr.slice());
    while (copy[x][y] !== 0) {
      x = getRandomInt(0, size);
      y = getRandomInt(0, size);
    }
    return { x, y };
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      console.log("Started");
      const copy = cells.map((arr) => arr.slice());
      const { velocityX, velocityY } = e;
      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        // horizontal swipe
        if (velocityX > 0) {
          // swipe right
          console.log("Swipe Right");
          for (let x = 0; x < cells.length; x++) {
            for (let y = 0; y < cells[x].length; y++) {
              // move square to the right
              // move only squares with values
              if (cells[x][y] !== 0) {
                // move only square in valid range
                if (y + 1 < cells[x].length) {
                  // combine the same numbers
                  if (cells[x][y + 1] === cells[x][y]) {
                    copy[x][y + 1] += cells[x][y];
                    copy[x][y] = 0;

                    // prevent collision
                  } else if (cells[x][y + 1] === 0) {
                    copy[x][y + 1] = cells[x][y];
                    copy[x][y] = 0;
                  }
                }
              }
            }
          }

          let x = Math.floor(Math.random() * 4);
          let y = Math.floor(Math.random() * 4);
          let count = 0;
          while (copy[x][y] !== 0 && count < 10) {
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
            count++;
          }
          if (count < 9) copy[x][y] = 2;

          runOnJS(updateBoardOnJS)(copy);
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
    .onEnd((e) => {
      console.log("Ended");
    });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <View style={styles.container}>
          {cells.map((r, rdx) => (
            <View key={rdx} style={styles.cellRow}>
              {r.map((c, cdx) => (
                <Cell key={cdx} value={c} />
              ))}
            </View>
          ))}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const getRandomInt = (min = 0, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  //The maximum is exclusive and the minimum is inclusive
};

export default Board;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    //   height: "100%",
  },
  cellRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
