import { UrgencyLevel } from "./urgencyLevel";
import { UrgencyLevelPtBr } from "./urgencyLevelPtBr";

export type ProductModel = {
  id?: string;
  name: string;
  urgencyLevel: UrgencyLevel;
  shoppingCartId?: string;
};

export class Product {
  private _id?: string;
  private _name: string;
  private _urgencyLevel: UrgencyLevel;

  constructor(id?: string, name?: string, urgencyLevel?: UrgencyLevel) {
    this._id = id!;
    this._name = name!;
    this._urgencyLevel = urgencyLevel!;
  }

  get id(): string {
    return this._id!;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get urgencyLevel(): UrgencyLevel {
    return this._urgencyLevel;
  }

  set urgencyLevel(value: UrgencyLevelPtBr) {
    switch (value) {
      case UrgencyLevelPtBr.MuitoUrgente:
        this._urgencyLevel = UrgencyLevel.CRITICAL;
        break;
      case UrgencyLevelPtBr.Urgente:
        this._urgencyLevel = UrgencyLevel.HIGH;
        break;
      case UrgencyLevelPtBr.Normal:
        this._urgencyLevel = UrgencyLevel.NORMAL;
        break;
      case UrgencyLevelPtBr.PodeEsperar:
        this._urgencyLevel = UrgencyLevel.LOW;
        break;
      case UrgencyLevelPtBr.TalvezComprar:
        this._urgencyLevel = UrgencyLevel.LOWEST;
        break;
    }
  }
}
