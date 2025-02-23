import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Location from "./HomeScreen/Location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const CustomHeader = () => {
  const notificationCount = useSelector((state: RootState) => state.product.notifications);

  return (
    <View style={styles.headerContainer}>
      <Location />
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="notifications-sharp" size={24} color="black" />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
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
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CustomHeader;

// The notification icon now shows the count directly from Redux! Let me know if you’d like any adjustments. 🚀
