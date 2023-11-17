import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter } from './routes/AppRouter';
import theme from './theme/theme';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  )
}

export default App
