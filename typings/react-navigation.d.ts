import { StyleProp, TextProps, ViewStyle } from 'react-native';
import 'react-navigation';

declare module 'react-navigation' {
  interface SafeAreaViewProps {
    style?: StyleProp<ViewStyle>;
  }
  export const HeaderTitle: React.ComponentType<TextProps>;

  // workaround until the types are fixed
  export interface OverriddenNavigationStackScreenOptions extends NavigationStackScreenOptions {
    headerTitle?: string | React.ReactElement<any> | React.ComponentType;
  }
}
