import { View, Text } from "react-native";
import React, { useEffect } from "react";
import SafeAreaWrapper from "../configs/SafeAreaWrapper";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaWrapper bg="#00ccbb" flexNum={1}>
      <View className="flex-1 justify-center items-center">
        <Animatable.Image
          source={require("../assets/loder.gif")}
          animation="slideInUp"
          iterationCount={1}
          className="h-96 w-96"
        />

        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          className="text-lg my-10 text-white font-bold text-center"
        >
          Waiting For Restaurant to accept your order!
        </Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color="white" />
      </View>
    </SafeAreaWrapper>
  );
};

export default PreparingOrderScreen;
