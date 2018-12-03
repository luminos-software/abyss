import { TextProps } from 'react-native';
import 'react-navigation';

declare module 'react-navigation' {
  export const HeaderTitle: React.ComponentType<TextProps>;
}
