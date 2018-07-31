"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { width, height } = react_native_1.Dimensions.get('window');
const HEADER_HEIGHT = react_native_1.Platform.select({ ios: 44, android: 74 });
const STATUSBAR_DEFAULT_HEIGHT = react_native_1.Platform.select({ ios: 20, android: 0 });
// iphone x has a different statusbar height
if (react_native_1.Platform.OS === 'ios') {
    // this might be private
    react_native_1.NativeModules.StatusBarManager.getHeight((data) => {
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
    device: { height, width, pixelRatio: react_native_1.PixelRatio.get(), fontScale: react_native_1.PixelRatio.getFontScale() },
    header: {
        padding: STATUSBAR_DEFAULT_HEIGHT,
        height: HEADER_HEIGHT,
        totalHeight: HEADER_HEIGHT + STATUSBAR_DEFAULT_HEIGHT
    },
    statusBar: { height: STATUSBAR_DEFAULT_HEIGHT },
    screen: { height: height - HEADER_HEIGHT - STATUSBAR_DEFAULT_HEIGHT, width }
};
exports.getMetrics = () => metrics;
//# sourceMappingURL=metrics.js.map