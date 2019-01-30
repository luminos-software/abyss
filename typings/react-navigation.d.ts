import { TextProps } from 'react-native';
import 'react-navigation';

declare module 'react-navigation' {
  export const HeaderTitle: React.ComponentType<TextProps>;

  // workaround until the types are fixed
  // this errors out, but it's fine :)
  export interface OverriddenNavigationStackScreenOptions extends NavigationStackScreenOptions {
    headerTitle?: string | React.ReactElement<any> | React.ComponentType;
  }
}
