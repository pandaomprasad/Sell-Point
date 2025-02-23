// Navigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import SellScreen from '../Screens/SellScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ChatScreen from '../Screens/ChatScreen';
import { CustomTabBar } from '../Components/CustomTab';
import Location from '../Components/HomeScreen/Location';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
   
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
               headerTitle:()=><Location/>
        }} />
        <Tab.Screen name="Sell" component={SellScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Message" component={ChatScreen} />
      </Tab.Navigator>
    
  );
};

export default BottomNavigation;

// This sets up a bottom tab bar with Home, Sell, Profile, and Message screens! Let me know if you want to customize the icons or style. 🚀
