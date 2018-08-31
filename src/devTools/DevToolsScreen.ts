import { StackScreen } from '../navigation/navigators/StackNavigator';
import { ThemeSelector } from './ThemeSelector';

export const DevToolsScreen = StackScreen.withDefaultHeader(ThemeSelector, {
  headerTitle: 'Dev Tools',
  headerStyle: { backgroundColor: '#d53646' },
  headerTitleStyle: { color: 'white' }
});
