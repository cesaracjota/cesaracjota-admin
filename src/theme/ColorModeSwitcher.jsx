import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      fontSize="lg"
      variant="ghost"
      display={'lg'}
      rounded={'lg'}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};
