import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartSlice } from "./shoppingCart/shoppingCartSlice";
import { productSlice } from "./products/productSlice";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice.reducer,
    product: productSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
