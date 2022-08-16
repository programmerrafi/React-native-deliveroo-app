import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "../configs/SafeAreaWrapper";
import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import client from "../../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaWrapper>
      <View>
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={require("../assets/logo.png")}
            className="h-7 w-7 bg-gray-300 rounded-full p-4"
          />

          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-400">
              Deliver Now!
            </Text>
            <Text className="text-xl font-bold">
              Current Location
              <ChevronDownIcon size={20} color="#00ccbb" />
            </Text>
          </View>

          <UserIcon size={35} color="#00ccbb" />
        </View>

        {/* Search */}
        <View className="flex-row items-center pb-2 mx-4 space-x-2">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 px-3 py-2 items-center">
            <SearchIcon color="gray" size={20} />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>
          <AdjustmentsIcon size={20} color="#00ccbb" />
        </View>

        {/* Body */}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Categories */}
          <Categories />

          {/* Features Rows */}
          {featuredCategories?.map((category) => (
            <FeatureRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
