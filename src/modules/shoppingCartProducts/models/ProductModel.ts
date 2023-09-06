export type ProductModel = {
  id?: string;
  name: string;
  urgencyLevel:
    | "Muito Urgente"
    | "Urgente"
    | "Normal"
    | "Pode Esperar"
    | "Talvez Comprar";
};
