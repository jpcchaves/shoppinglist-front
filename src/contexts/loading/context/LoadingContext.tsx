import { createContext } from "react";

export type ILoadingContext = {
  isLoading: boolean;
  toggleLoading: () => void;
};

export const LoadingContext = createContext<ILoadingContext>(null!);
