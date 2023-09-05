import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import ModalDeleteProvider from "./contexts/modalDelete/provider/ModalDeleteProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <ModalDeleteProvider>
            <App />
          </ModalDeleteProvider>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
