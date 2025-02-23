import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Recomendations from "../Components/HomeScreen/Recomendation";
import { useDispatch } from "react-redux";
import { setProductList } from "../Redux/slices/productSlice";
import productData from "../JSON/Products.json";
import HomeSearch from "../Components/HomeScreen/Search";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    dispatch(setProductList(productData));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <HomeSearch onSearch={handleSearch} />
      <Recomendations searchQuery={searchQuery} />
    </>
  );
}

// Now the search bar updates the search query, and you can filter products in Recomendations! Let me know if you want me to add the filtering logic! 🚀
