import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GLobalStyle } from "./GlobalStyles";
import { darkTheme } from "./theme";

const client = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <GLobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
