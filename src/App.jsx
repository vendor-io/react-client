import styledEngine from '@mui/styled-engine';
import { themeOptions } from './styles/theme';

const AppContainer = styledEngine.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
   return (
      <ThemeProvider theme={themeOptions}>
         <AppContainer>Keyboardify</AppContainer>
      </ThemeProvider>
   );
}

export default App;
