import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import ModalDeleteProvider from "./contexts/modalDelete/provider/ModalDeleteProvider";
import LoadingProvider from "./contexts/loading/provider/LoadingProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <LoadingProvider>
          <Provider store={store}>
            <ModalDeleteProvider>
              <App />
            </ModalDeleteProvider>
          </Provider>
        </LoadingProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
