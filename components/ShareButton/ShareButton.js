import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const ShareButton = ({ boardView }) => {
  return (
    <Pressable
      style={{
        backgroundColor: "#9EE09E",
        padding: 10,
        margin: 15,
        width: 200,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
      }}
      onPress={() => shareAsync(boardView)}
    >
      <Text style={{ textAlign: "center", fontSize: 28 }}>Share</Text>
    </Pressable>
  );
};

const shareAsync = async (boardRef) => {
  if (!boardRef.current) {
    console.log("There was no ref");
    return;
  }

  const imgUri = await captureRef(boardRef, { format: "png", quality: 0.5 });
  await Sharing.shareAsync(imgUri);
};

export default ShareButton;

const styles = StyleSheet.create({});
