import AsyncStorage from '@react-native-community/async-storage';
import R from 'ramda';
import React from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import tinycolor, { ColorFormats } from 'tinycolor2';
import { AbyssConfig } from '../config';
import { Button } from './Button';
import { ColorPicker } from './ColorPicker';
import { replaceColors } from './replaceColors';
import { styles } from './styles/ThemeSelectorStyles';

interface IState {
  colors: ColorFormats.HSLA[];
  isModalVisible: boolean;
  selectedColor: ColorFormats.HSLA | null;
  selectedIndex: number;
}

export class ThemeSelector extends React.PureComponent<{}, IState> {
  state: IState = {
    colors: Object.keys(AbyssConfig.theme.colors).map(color =>
      tinycolor(AbyssConfig.theme.colors[color as keyof typeof AbyssConfig.theme.colors]).toHsl()
    ),
    isModalVisible: false,
    selectedColor: null,
    selectedIndex: -1
  };

  storeColors = () => {
    const colors = R.fromPairs(
      Object.keys(AbyssConfig.theme.colors).map(
        (color, index) => [color, tinycolor(this.state.colors[index]).toHex8String()] as R.KeyValuePair<string, string>
      )
    ) as typeof AbyssConfig.theme.colors;

    replaceColors(colors).then(() => require('react-native-restart').default.Restart());
  };

  resetColors = () => {
    AsyncStorage.removeItem('theme.colors').then(() => require('react-native-restart').default.Restart());
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          {Object.keys(AbyssConfig.theme.colors).map((color, index) => (
            <View key={color}>
              <Text style={styles.colorText}>{color}</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({ selectedColor: this.state.colors[index], selectedIndex: index, isModalVisible: true })
                }
              >
                <View style={styles.colorContainer}>
                  <View
                    style={[{ backgroundColor: tinycolor(this.state.colors[index]).toRgbString() }, styles.colorSample]}
                  />
                  <Text style={styles.colorText}>{tinycolor(this.state.colors[index]).toHexString()}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </ScrollView>
        <Button title="Apply and restart" onPress={this.storeColors} style={styles.button} />
        <Button title="Reset and restart" onPress={this.resetColors} style={styles.button} />
        <ColorPicker
          key={this.state.selectedIndex}
          isVisible={this.state.isModalVisible}
          color={this.state.selectedColor}
          onColorChange={color => {
            const colors = [...this.state.colors];
            colors[this.state.selectedIndex] = color;
            this.setState({ colors });
          }}
          onDismiss={() => this.setState({ isModalVisible: false })}
        />
      </View>
    );
  }
}
