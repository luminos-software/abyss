"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const metrics_1 = require("../../theme/metrics");
exports.styles = react_native_1.StyleSheet.create({
    modal: { margin: 0, alignSelf: 'center' },
    modalContent: { width: metrics_1.getMetrics().device.width * 0.9, backgroundColor: 'white', padding: 20 },
    modalText: {
        color: 'black'
    },
    modalColorSample: {
        height: 30,
        width: '100%',
        marginVertical: 20,
        borderColor: 'black',
        borderWidth: 2
    },
    modalTextInput: {
        marginTop: 20,
        fontSize: 18,
        padding: 4,
        borderColor: 'black',
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        borderRadius: 2
    }
});
//# sourceMappingURL=ColorPickerStyles.js.map