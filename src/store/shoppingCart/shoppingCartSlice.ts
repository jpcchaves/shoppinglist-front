import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCartModel } from "../../modules/shoppingCart/models/ShoppingCartModel";

interface ShoppingCartState {
  shoppingCarts: ShoppingCartModel[];
  shoppingCartById: ShoppingCartModel;
}

interface PayloadLoadShoppingCart extends PayloadAction<ShoppingCartModel[]> {}

interface PayloadLoadShoppingCartById
  extends PayloadAction<ShoppingCartModel> {}

const initialState: ShoppingCartState = {
  shoppingCarts: [],
  shoppingCartById: null!,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    loadShoppingCarts: (
      state: ShoppingCartState,
      action: PayloadLoadShoppingCart,
    ) => {
      state.shoppingCarts = action.payload;
    },
    loadShoppingCartById: (
      state: ShoppingCartState,
      action: PayloadLoadShoppingCartById,
    ) => {
      state.shoppingCartById = action.payload;
    },
    clearShoppingCartById: (state: ShoppingCartState) => {
      state.shoppingCartById = null!;
    },
  },
});

export const {
  loadShoppingCarts,
  loadShoppingCartById,
  clearShoppingCartById,
} = shoppingCartSlice.actions;
