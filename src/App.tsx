import { useRecoilValue } from "recoil";
import { GLobalStyle } from "./GlobalStyles";
import { isDarkState } from "./atom";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GLobalStyle />
    </ThemeProvider>
  );
}
export default App;
