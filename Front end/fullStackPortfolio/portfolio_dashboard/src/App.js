import { ThemeProvider } from "styled-components";import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { theme } from "./style/theme";
import MyRoutes from "./Routes";

const App = () => {
  return (
    <ThemeProvider theme={theme} >
      <MyRoutes/>
    </ThemeProvider>
  );
};

export default App;