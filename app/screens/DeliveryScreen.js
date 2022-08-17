import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../Redux/features/restaurantSlice";
import SafeAreaWrapper from "../configs/SafeAreaWrapper";
import { XIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00ccbb] flex-1 relative">
      <View className="z-50">
        <View className="flex-row justify-between items-center pt-12 px-5 pb-3">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Oder Help</Text>
        </View>

        <View className=" bg-white mx-5 my-2 rounded-md p-6 z-100 shadow-md">
          <View className="flex-row justify-between ">
            <View>
              <Text className="text-gray-400 text-base">Estimates Arrival</Text>
              <Text className="font-bold text-3xl">44-55 Minutes</Text>
            </View>
            <Image
              source={require("../assets/bike.gif")}
              className="h-16 w-16"
            />
          </View>

          <Progress.Bar size={30} indeterminate={true} color="#00ccbb" />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared.
          </Text>
        </View>
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          indentifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>

      <View className="flex-row items-center space-x-5 h-28 bg-white">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Md Rafi</Text>
          <Text className="text-gray-400">Your Ride</Text>
        </View>
        <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
