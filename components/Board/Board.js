import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Cell from "../Cell";
import ShareButton from "../ShareButton";

const initialCells = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const Board = ({ size = 4 }) => {
  const [cells, setCells] = useState(initialCells);
  const [lost, setLost] = useState(false);

  const boardRef = useRef();

  const updateBoardOnJS = (newBoard) => {
    // console.log("you updated the board from the JS thread");
    setCells(newBoard);
  };

  const updateLostOnJS = (bool) => {
    setLost(bool);
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
    const copy = board.map((arr) => arr.slice());

    let unfilledSquares = [];
    copy.forEach((row, rdx) =>
      row.forEach((_, cdx) => {
        if (copy[rdx][cdx] === 0) {
          unfilledSquares.push({ x: rdx, y: cdx });
        }
      })
    );

    if (unfilledSquares.length) {
      const index = Math.floor(Math.random() * unfilledSquares.length);
      const { x, y } = unfilledSquares[index];
      // console.log(x, y);
      copy[x][y] = 2;
    }
    return copy;
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      const copy = cells.map((arr) => arr.slice());
      const { velocityX, velocityY } = e;
      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        // horizontal swipe
        if (velocityX > 0) {
          // console.log("Swipe Right");
          for (let col = 2; col > -1; col--) {
            for (let row = 0; row < 4; row++) {
              if (col === 3) {
                col = 2;
              }
              if (copy[row][col] !== 0) {
                if (copy[row][col + 1] === copy[row][col]) {
                  copy[row][col + 1] *= 2;
                  copy[row][col] = 0;
                } else if (copy[row][col + 1] === 0) {
                  copy[row][col + 1] = copy[row][col];
                  copy[row][col] = 0;
                  row--; //go back a col and row to check the new spot
                  col++;
                }
              }
            }
          }

          let unfilledSquares = [];
          copy.forEach((row, rdx) =>
            row.forEach((_, cdx) => {
              if (copy[rdx][cdx] === 0) {
                unfilledSquares.push({ x: rdx, y: cdx });
              }
            })
          );

          if (unfilledSquares.length) {
            const index = Math.floor(Math.random() * unfilledSquares.length);
            const { x, y } = unfilledSquares[index];
            // console.log(x, y);
            copy[x][y] = 2;
          }

          runOnJS(updateBoardOnJS)(copy);
        } else {
          // console.log("Swipe Left");
          for (let col = 1; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
              if (col === 0) {
                col = 1;
              }
              if (copy[row][col] !== 0) {
                if (copy[row][col - 1] === copy[row][col]) {
                  copy[row][col - 1] *= 2;
                  copy[row][col] = 0;
                } else if (copy[row][col - 1] === 0) {
                  copy[row][col - 1] = copy[row][col];
                  copy[row][col] = 0;
                  row--; //go back a col and row to check the new spot
                  col--;
                }
              }
            }
          }

          let unfilledSquares = [];
          copy.forEach((row, rdx) =>
            row.forEach((_, cdx) => {
              if (copy[rdx][cdx] === 0) {
                unfilledSquares.push({ x: rdx, y: cdx });
              }
            })
          );

          if (unfilledSquares.length) {
            const index = Math.floor(Math.random() * unfilledSquares.length);
            const { x, y } = unfilledSquares[index];
            copy[x][y] = 2;
          }

          runOnJS(updateBoardOnJS)(copy);
        }
      } else {
        // vertical swipe
        if (velocityY > 0) {
          // swipe right
          // console.log("Swipe Down");

          for (let row = 2; row > -1; row--) {
            //go from bottom to top
            for (let col = 0; col < 4; col++) {
              if (row === 3) {
                //in case checking a moved number would go out of bounds, set it back into bounds.
                row = 2;
              }
              if (copy[row][col] !== 0) {
                if (copy[row + 1][col] === copy[row][col]) {
                  copy[row + 1][col] *= 2;
                  copy[row][col] = 0;
                } else if (copy[row + 1][col] === 0) {
                  copy[row + 1][col] = copy[row][col];
                  copy[row][col] = 0;
                  row++; //go back a col and row to check the new spot
                  col--;
                }
              }
            }
          }

          let unfilledSquares = [];
          copy.forEach((row, rdx) =>
            row.forEach((_, cdx) => {
              if (copy[rdx][cdx] === 0) {
                unfilledSquares.push({ x: rdx, y: cdx });
              }
            })
          );

          if (unfilledSquares.length) {
            const index = Math.floor(Math.random() * unfilledSquares.length);
            const { x, y } = unfilledSquares[index];
            // console.log(x, y);
            copy[x][y] = 2;
          }

          runOnJS(updateBoardOnJS)(copy);
        } else {
          // swipe left
          // console.log("Swipe Up");

          for (let row = 1; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
              if (row === 0) {
                row = 1;
              }
              if (copy[row][col] !== 0) {
                //the box above is at board[row-1][col]
                if (copy[row - 1][col] === copy[row][col]) {
                  //if the one above is the same, we combine them.
                  copy[row - 1][col] *= 2;
                  copy[row][col] = 0;
                } else if (copy[row - 1][col] === 0) {
                  //if the thing above is empty, we move it up
                  copy[row - 1][col] = copy[row][col];
                  copy[row][col] = 0;
                  row--; //go back a column and row to check that spot again
                  col--;
                }
              }
            }
          }

          let unfilledSquares = [];
          copy.forEach((row, rdx) =>
            row.forEach((_, cdx) => {
              if (copy[rdx][cdx] === 0) {
                unfilledSquares.push({ x: rdx, y: cdx });
              }
            })
          );

          if (unfilledSquares.length) {
            const index = Math.floor(Math.random() * unfilledSquares.length);
            const { x, y } = unfilledSquares[index];
            // console.log(x, y);
            copy[x][y] = 2;
          }

          runOnJS(updateBoardOnJS)(copy);
        }
      }
    })
    .onEnd((e) => {
      // console.log("Ended");
      const copy = cells.map((arr) => arr.slice());
      const movesLeft = false;

      for (let col = 2; col > -1; col--) {
        for (let row = 0; row < 4; row++) {
          if (col === 3) {
            col = 2;
          }
          if (copy[row][col] !== 0) {
            if (copy[row][col + 1] === copy[row][col]) {
              copy[row][col + 1] *= 2;
              copy[row][col] = 0;
            } else if (copy[row][col + 1] === 0) {
              copy[row][col + 1] = copy[row][col];
              copy[row][col] = 0;
              row--; //go back a col and row to check the new spot
              col++;
            }
          }
        }
      }

      for (let col = 1; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
          if (col === 0) {
            col = 1;
          }
          if (copy[row][col] !== 0) {
            if (copy[row][col - 1] === copy[row][col]) {
              copy[row][col - 1] *= 2;
              copy[row][col] = 0;
            } else if (copy[row][col - 1] === 0) {
              copy[row][col - 1] = copy[row][col];
              copy[row][col] = 0;
              row--; //go back a col and row to check the new spot
              col--;
            }
          }
        }
      }

      for (let row = 2; row > -1; row--) {
        //go from bottom to top
        for (let col = 0; col < 4; col++) {
          if (row === 3) {
            //in case checking a moved number would go out of bounds, set it back into bounds.
            row = 2;
          }
          if (copy[row][col] !== 0) {
            if (copy[row + 1][col] === copy[row][col]) {
              copy[row + 1][col] *= 2;
              copy[row][col] = 0;
            } else if (copy[row + 1][col] === 0) {
              copy[row + 1][col] = copy[row][col];
              copy[row][col] = 0;
              row++; //go back a col and row to check the new spot
              col--;
            }
          }
        }
      }

      for (let row = 1; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (row === 0) {
            row = 1;
          }
          if (copy[row][col] !== 0) {
            //the box above is at board[row-1][col]
            if (copy[row - 1][col] === copy[row][col]) {
              //if the one above is the same, we combine them.
              copy[row - 1][col] *= 2;
              copy[row][col] = 0;
            } else if (copy[row - 1][col] === 0) {
              //if the thing above is empty, we move it up
              copy[row - 1][col] = copy[row][col];
              copy[row][col] = 0;
              row--; //go back a column and row to check that spot again
              col--;
            }
          }
        }
      }

      // copy.forEa(ch
      // copy.forEach((row, idx) => if())
      let numBlank = 0;
      cells.forEach((r) =>
        r.forEach((c) => {
          if (c === 0) {
            numBlank++;
          }
        })
      );
      if (JSON.stringify(copy) === JSON.stringify(cells) && numBlank === 0) {
        console.log("You lost");
        runOnJS(updateLostOnJS)(true);
      }
    });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <View>
          <View
            style={{
              width: "100%",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              {lost && <Text style={{ fontSize: 30 }}>You Lost :(</Text>}
              <Text style={{ fontSize: 30 }}>
                Score:{" "}
                {cells.reduce((a, b) => a.concat(b)).reduce((a, b) => a + b)}
              </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: "#FEB144",
                margin: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                setCells(addNewValue(initialCells));
                setLost(false);
              }}
            >
              <Text>Reset</Text>
            </Pressable>
          </View>
          <View ref={boardRef} style={styles.container}>
            {cells.map((r, rdx) => (
              <View key={rdx} style={styles.cellRow}>
                {r.map((c, cdx) => {
                  return cells[rdx][cdx] === 0 ? (
                    <View
                      key={cdx}
                      style={{
                        flex: 1,
                        backgroundColor: "gray",
                        margin: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                      }}
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
                          }}
                        >
                          {}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Cell key={cdx} value={c} />
                  );
                })}
              </View>
            ))}
          </View>
          <View
            style={{
              width: "100%",
              height: 125,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ShareButton boardView={boardRef} />
          </View>
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
    // backgroundColor: "lightgreen",
    backgroundColor: "#d4d4d4",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    padding: 5,
    //   height: "100%",
  },
  cellRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
