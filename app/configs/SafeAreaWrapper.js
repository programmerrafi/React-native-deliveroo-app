import { SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";

const SafeAreaWrapper = ({ children, bg = "#fff", flexNum = 0, ...props }) => {
  return (
    <SafeAreaView
      style={{
        flex: flexNum,
        backgroundColor: bg,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
