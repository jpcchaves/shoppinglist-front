import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductList,
  ProductModel,
} from "../../modules/shoppingCartProducts/models/ProductModel";

interface ProductState {
  productList: ProductList;
  productById: ProductModel;
}

interface PayloadLoadProductList extends PayloadAction<ProductList> {}

interface PayloadLoadProductById extends PayloadAction<ProductModel> {}

const initialState: ProductState = {
  productList: {} as ProductList,
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
    clearProduct: (state: ProductState) => {
      state.productById = null!;
    },
  },
});

export const { loadProductList, loadProductById, clearProduct } =
  productSlice.actions;
