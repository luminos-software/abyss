import AsyncStorage from '@react-native-community/async-storage';
import { AbyssConfig } from '../config';

export const replaceColors = (newColors: typeof AbyssConfig.theme.colors) => {
  Object.keys(newColors).forEach(color => {
    const typedColor = color as keyof typeof AbyssConfig.theme.colors;
    AbyssConfig.theme.colors[typedColor] = newColors[typedColor]!;
  });

  return AsyncStorage.setItem('theme.colors', JSON.stringify(newColors));
};
