import { UrgencyLevel } from "./urgencyLevel";

export type ProductModel = {
  id?: string;
  name: string;
  urgencyLevel: UrgencyLevel;
  shoppingCartId?: string;
};
