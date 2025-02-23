import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Recomendations from "../Components/HomeScreen/Recomendation";
import { useDispatch } from "react-redux";
import { setProductList } from "../Redux/slices/productSlice";
import productData from "../JSON/Products.json";
import HomeSearch from "../Components/HomeScreen/Search";
import Category from "../Components/HomeScreen/Category";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setProductList(productData));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <HomeSearch onSearch={handleSearch} />
      <Category onSelectCategory={setSelectedCategory} />
      <Recomendations searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </>
  );
}

// Now both category and search work, and products will be filtered in Recomendations! 🚀
