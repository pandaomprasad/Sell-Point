import { View, Text } from "react-native";
import React, { useState } from "react";
import ProductCategory_SellPage from "../Components/Sellscreen/Cattegory";
import SearchSellCat from "../Components/Sellscreen/SearchSellCat";

export default function SellScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <SearchSellCat onSearch={setSearchQuery} />
      <ProductCategory_SellPage searchQuery={searchQuery} />
    </>
  );
}
