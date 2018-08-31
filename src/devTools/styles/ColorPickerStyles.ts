import { StyleSheet } from 'react-native';
import { getMetrics } from '../../theme/metrics';

export const styles = StyleSheet.create({
  modal: { margin: 0, alignSelf: 'center' },
  modalContent: { width: getMetrics().device.width * 0.9, backgroundColor: 'white', padding: 20 },
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
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2
  }
});
