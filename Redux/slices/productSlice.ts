import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    product_id: string;
    name: string;
    company: string;
    model: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
    seller: {
        name: string;
        address: string;
    };
}

interface ProductState {
    productList: Product[];
    selectedProduct: Product | null;
}

const initialState: ProductState = {
    productList: [],
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductList: (state, action: PayloadAction<Product[]>) => {
            state.productList = action.payload;
        },
        setProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
        },
        clearProduct: (state) => {
            state.selectedProduct = null;
        },
    },
});

export const { setProductList, setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;