import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShoppingCartModel} from "../../modules/shoppingCart/models/ShoppingCartModel";

interface ShoppingCartState {
  shoppingCarts: ShoppingCartModel[];
}

interface PayloadLoadShoppingCartModel extends PayloadAction<ShoppingCartModel[]> {
}


const initialState: ShoppingCartState = {
  shoppingCarts: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    loadShoppingCarts: (state: ShoppingCartState, action: PayloadLoadShoppingCartModel) => {
      state.shoppingCarts = action.payload;
    },
  },
});

export const {loadShoppingCarts} =
  shoppingCartSlice.actions;
