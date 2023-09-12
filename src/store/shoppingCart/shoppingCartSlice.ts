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
      state.shoppingCartById = null!;
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
    clearStates: (state) => {
      state.shoppingCartById = null!;
      state.shoppingCarts = [];
    },
  },
});

export const {
  loadShoppingCarts,
  loadShoppingCartById,
  clearShoppingCartById,
  clearStates,
} = shoppingCartSlice.actions;
