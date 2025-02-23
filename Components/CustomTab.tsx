import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
// import { Home, Search, PlusCircle, Clock, User } from 'lucide-react-native';
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Home")}
        >
          <AntDesign
            name="home"
            size={24}
            color={state.index === 0 ? "#6C63FF" : "#757575"}
            strokeWidth={state.index === 0 ? 5.5 : 2}
          />
          <Text
            style={[
              styles.label,
              { color: state.index === 0 ? "#6C63FF" : "#757575" },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Sell")}
        >
          <AntDesign
            name="search1"
            size={24}
            color={state.index === 1 ? "#6C63FF" : "#757575"}
            strokeWidth={state.index === 1 ? 5.5 : 2}
          />
          <Text
            style={[
              styles.label,
              { color: state.index === 1 ? "#6C63FF" : "#757575" },
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* Center Button */}
      <View style={styles.centerContainer}>
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => navigation.navigate("Sell")}
        >
          <AntDesign
            name="plus"
            size={24}
            color={state.index === 2 ? "#6C63FF" : "#757575"}
            strokeWidth={state.index === 2 ? 5.5 : 2}
          />
          <Text>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Right Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Sell")}
        >
          <AntDesign
            name="clockcircleo"
            size={24}
            color={state.index === 3 ? "#6C63FF" : "#757575"}
            strokeWidth={state.index === 3 ? 5.5 : 2}
          />
          <Text
            style={[
              styles.label,
              { color: state.index === 3 ? "#6C63FF" : "#757575" },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Sell")}
        >
          <AntDesign
            name="user"
            size={24}
            color={state.index === 4 ? "#6C63FF" : "#757575"}
          />
          <Text
            style={[
              styles.label,
              { color: state.index === 4 ? "#6C63FF" : "#757575" },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    height:height*0.09
  },
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    width: width * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    backgroundColor: "#6C63FF",
    width: 100,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    elevation: 4,
    shadowColor: "#6C63FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: "row",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
