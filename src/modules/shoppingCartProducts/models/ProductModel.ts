import { UrgencyLevel } from "./urgencyLevel";
import { UrgencyLevelPtBr } from "./urgencyLevelPtBr";

export type ProductList = {
  shoppingCartName: string;
  products: ProductModel[];
  shoppingListTotalPrice?: string;
};

export type ProductModel = {
  id?: string;
  name: string;
  urgencyLevel: UrgencyLevel;
  shoppingCartId?: string;
  productPrice?: string;
  productQuantity?: string;
  totalPrice?: string;
};

export const setUrgencyLevel = (value: UrgencyLevelPtBr) => {
  switch (value) {
    case UrgencyLevelPtBr.MuitoUrgente:
      return UrgencyLevel.CRITICAL;
    case UrgencyLevelPtBr.Urgente:
      return UrgencyLevel.HIGH;
    case UrgencyLevelPtBr.Normal:
      return UrgencyLevel.NORMAL;
    case UrgencyLevelPtBr.PodeEsperar:
      return UrgencyLevel.LOW;
    case UrgencyLevelPtBr.TalvezComprar:
      return UrgencyLevel.LOWEST;
  }
};
