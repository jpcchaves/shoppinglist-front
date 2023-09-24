import { UrgencyLevelPtBr } from "./urgencyLevelPtBr";

export type ProductByIdModel = {
  id?: string;
  name: string;
  urgencyLevel: UrgencyLevelPtBr;
  shoppingCartId?: string;
  productPrice?: string;
  productQuantity?: string;
  totalPrice?: string;
};
