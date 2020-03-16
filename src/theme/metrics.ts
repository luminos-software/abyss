import { Dimensions, NativeModules, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.select({ ios: 44, android: 74 })!;
const STATUSBAR_DEFAULT_HEIGHT = Platform.select({ ios: 20, android: 0 })!;

// iphone x has a different statusbar height
if (Platform.OS === 'ios') {
  // this might be private
  NativeModules.StatusBarManager.getHeight((data: { height: number }) => {
    if (data.height === STATUSBAR_DEFAULT_HEIGHT) {
      return;
    }
    const diff = data.height - STATUSBAR_DEFAULT_HEIGHT;
    metrics.header.padding += diff;
    metrics.header.totalHeight += diff;
    metrics.statusBar.height += diff;
    metrics.screen.height += diff;
  });
}

const metrics = {
  device: { height, width, pixelRatio: PixelRatio.get(), fontScale: PixelRatio.getFontScale() },
  header: {
    padding: STATUSBAR_DEFAULT_HEIGHT,
    height: HEADER_HEIGHT,
    totalHeight: HEADER_HEIGHT + STATUSBAR_DEFAULT_HEIGHT
  },
  statusBar: { height: STATUSBAR_DEFAULT_HEIGHT },
  screen: { height: height - HEADER_HEIGHT - STATUSBAR_DEFAULT_HEIGHT, width }
};

export const getMetrics = () => metrics;
