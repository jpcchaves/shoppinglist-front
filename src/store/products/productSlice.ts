import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../../modules/shoppingCartProducts/models/ProductModel";

interface ProductState {
  productList: ProductModel[];
  productById: ProductModel;
}

interface PayloadLoadProductList extends PayloadAction<ProductModel[]> {}

interface PayloadLoadProductById extends PayloadAction<ProductModel> {}

const initialState: ProductState = {
  productList: [],
  productById: null!,
};

export const productSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    loadProductList: (state: ProductState, action: PayloadLoadProductList) => {
      state.productList = action.payload;
      state.productById = null!;
    },
    loadProductById: (state: ProductState, action: PayloadLoadProductById) => {
      state.productById = action.payload;
    },
  },
});

export const { loadProductList, loadProductById } = productSlice.actions;
