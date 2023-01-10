import {useMantineColorScheme, ActionIcon, useMantineTheme} from '@mantine/core';
import type {FC} from 'react';
import {IconBulb, IconBulbOff} from '@tabler/icons';

const BULB_SIZE = 22;

const ThemeToggle: FC = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const theme = useMantineTheme();

  return {
    light: (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={{
          color: theme.colors.yellow[6],
        }}
      >
        <IconBulb size={BULB_SIZE} />
      </ActionIcon>
    ),
    dark: (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={{
          color: theme.colors.gray[4],
        }}
      >
        <IconBulbOff size={BULB_SIZE} />
      </ActionIcon>
    ),
  }[colorScheme];
};

export default ThemeToggle;
