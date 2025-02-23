// productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  product_id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  seller: {
    name: string;
    address: string;
  };
  company: string;
}

interface ProductState {
  productList: Product[];
  selectedProduct: Product | null;
  wishlist: Product[];
  notifications: number; // Added notifications count
}

const initialState: ProductState = {
  productList: [],
  selectedProduct: null,
  wishlist: [],
  notifications: 99, // Initial count
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.wishlist.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingIndex !== -1) {
        state.wishlist.splice(existingIndex, 1);
      } else {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.product_id !== action.payload
      );
    },
    setNotifications: (state, action: PayloadAction<number>) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setProductList,
  setProduct,
  addToWishlist,
  removeFromWishlist,
  setNotifications,
} = productSlice.actions;

export default productSlice.reducer;

// Now you can track and update notification counts! Let me know if you want me to wire it up to the header! 🚀
