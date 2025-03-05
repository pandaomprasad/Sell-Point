import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Custom_Input from "../Components/Input/Custom_Input";
import Radio_Button from "../Components/Input/Radio_Button";
import data from "../JSON/fuel_data.json";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import MultiLevelDropdown from "../Components/Input/dropdown";
import dropData from "../JSON/multiLevelDropdownData.json";

export default function MyAdsScreen() {
  const [radioData, setRadioData] = useState<RadioButtonProps[]>([]);

  useEffect(() => {
    setRadioData(data); // Load data from file
  }, []);

  return (
    <>
      <Custom_Input />
      <MultiLevelDropdown data={dropData} />
    </>
  );
}
