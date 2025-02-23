import { View, Text } from "react-native";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface BikeSVGProps {
  size: number; 
}

const BikeSVG: React.FC<BikeSVGProps> = ({ size }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <G
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <Path d="M2 16a3 3 0 1 0 6 0a3 3 0 1 0-6 0m14 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-8.5-2h5l4-4H6m1.5 4l4-4" />
        <Path d="M13 6h2l1.5 3l2 4" />
      </G>
    </Svg>
  );
};

export default BikeSVG;
