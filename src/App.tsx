import React from "react";
import { useRecoilValue } from "recoil";
import { GLobalStyle } from "./GlobalStyles";
import { Router } from "./Router";
import { isDarkAtom } from "./atoms";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  console.log(isDark);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GLobalStyle />
      <Router />
    </ThemeProvider>
  );
}
export default App;
