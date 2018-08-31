import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export const Button: React.SFC<{ title: string; onPress: () => void; style?: StyleProp<ViewStyle> }> = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[
        { justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#3e5151', borderRadius: 3 },
        props.style
      ]}
    >
      <Text style={{ color: 'white', fontSize: 18 }}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);
