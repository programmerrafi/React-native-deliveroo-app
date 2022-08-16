import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  // const { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-10 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#00ccbb" />
        </TouchableOpacity>
      </View>

      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="font-bold text-3xl">{title}</Text>
          <View className="flex-row my-1 space-x-2">
            <View className="flex-row items-center space-x-1">
              <StarIcon size={22} color="green" opacity={0.5} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500"> {rating}</Text> . {genre}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <LocationMarkerIcon size={22} color="gray" opacity={0.4} />
              <Text className="text-xs text-gray-500">Nearby . {address}</Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
          <Text className="pl-2 flex-1 text-md font-bold">
            Have a food allergy?
          </Text>
          <ChevronRightIcon size={20} color="#00ccbb" opacity={0.6} />
        </TouchableOpacity>
      </View>

      <View>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

        {/* Dishrows */}
        {dishes?.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            price={dish.price}
            description={dish.short_description}
            image={dish.image}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
