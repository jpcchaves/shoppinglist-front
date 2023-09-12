import { JSX, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import LoadingScreen from "../components/loadingScreen";

interface IProps {
  children: JSX.Element;
}

const LoadingProvider = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading((prevState) => !prevState);
  };
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        toggleLoading,
      }}
    >
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
