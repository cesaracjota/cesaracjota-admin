import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/public-sans';
import '@fontsource/poppins';

const theme = extendTheme({
  fonts: {
    heading: `'Public Sans Variable', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    primary: {
      50: '#e0defe',
      100: '#805ad5',
      200: '#514af7',
      300: '#423af6',
      400: '#332af5',
      500: '#2319f5',
      600: '#1e88e5',
      700: '#ffffff1f',
      800: '#ffffff33',
      900: '#13161c',
      1000: '#13161c',
      1100: '#13161c',
      1200: '#0D0F14',
    },
  },
})


export default theme;