import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { HueSlider, LightnessSlider, SaturationSlider } from 'react-native-color';
import Modal from 'react-native-modal';
import tinycolor, { ColorFormats } from 'tinycolor2';
import { Button } from './Button';
import { styles } from './styles/ColorPickerStyles';

interface IPickerProps {
  isVisible: boolean;
  color: ColorFormats.HSLA | null;
  onColorChange: (color: ColorFormats.HSLA) => void;
  onDismiss: () => void;
}

export class ColorPicker extends React.PureComponent<IPickerProps, { color: ColorFormats.HSLA | null }> {
  state = { color: this.props.color };

  updateHue = (h: number) => this.setState({ color: { ...this.state.color!, h } });
  updateSaturation = (s: number) => this.setState({ color: { ...this.state.color!, s } });
  updateLightness = (l: number) => this.setState({ color: { ...this.state.color!, l } });

  handleRgbChange = (text: string) => {
    const color = tinycolor(text);
    if (text.length === 7 && color.isValid()) {
      this.setState({ color: color.toHsl() });
    }
  };

  handleCancel = () => {
    this.props.onDismiss();
    this.setState({ color: this.props.color });
  };

  render() {
    if (!this.state.color) {
      return null;
    }
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.handleCancel}
        style={styles.modal}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Hue</Text>
          <HueSlider style={{}} gradientSteps={40} value={this.state.color.h} onValueChange={this.updateHue} />
          <Text style={styles.modalText}>Saturation</Text>
          <SaturationSlider
            style={{}}
            gradientSteps={20}
            value={this.state.color.l}
            color={this.state.color}
            onValueChange={this.updateLightness}
          />
          <Text style={styles.modalText}>Lightness</Text>
          <LightnessSlider
            style={{}}
            gradientSteps={20}
            value={this.state.color.s}
            color={this.state.color}
            onValueChange={this.updateSaturation}
          />
          <TextInput
            value={tinycolor(this.state.color).toHexString()}
            style={styles.modalTextInput}
            onChangeText={this.handleRgbChange}
          />
          <View style={[{ backgroundColor: tinycolor(this.state.color).toRgbString() }, styles.modalColorSample]} />
          <Button
            title="Ok"
            onPress={() => {
              this.props.onColorChange(this.state.color!);
              this.props.onDismiss();
            }}
          />
        </View>
      </Modal>
    );
  }
}
