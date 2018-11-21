import { StackScreen } from '../navigation/navigators/StackNavigator';
import { ThemeSelector } from './ThemeSelector';

export const ThemeSelectorScreen = StackScreen.withDefaultHeader(ThemeSelector, {
  headerTitle: 'Theme Selector',
  headerStyle: { backgroundColor: '#d53646' },
  headerTitleStyle: { color: 'white' }
});
