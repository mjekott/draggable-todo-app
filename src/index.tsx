import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const client = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
