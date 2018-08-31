import { TextInputProps } from 'react-native';
import 'react-native-elements';

declare module 'react-native-elements' {
  // fix for TextInputProperties -> TextInputProps
  export interface SearchBarProps extends TextInputProps {}
}
