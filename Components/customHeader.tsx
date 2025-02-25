import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Location from "./HomeScreen/Location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/navigation";

const CustomHeader = () => {
  const notificationCount = useSelector((state: RootState) => state.product.notifications);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.headerContainer}>
      <Location />
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Notification")}>
        <Ionicons name="notifications-sharp" size={24} color="black" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {notificationCount > 99 ? "99+" : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 25,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CustomHeader;

// Notification count will show "99+" if it's greater than 99. Let me know if you want me to tweak anything else! 🚀