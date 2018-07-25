"use strict";
// import { Navigation } from 'abyss';
// import { Text } from 'lib/Text';
// import React from 'react';
// import { Platform, TouchableOpacity, View } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { theme } from 'theme';
// import { styles } from './styles/BackButtonStyles';
// interface IProps {
//   enabled?: boolean;
//   onPress?: () => void;
// }
// export const BackButton: React.SFC<IProps> = ({ enabled = true, onPress = Navigation.back }) => (
//   <TouchableOpacity
//     onPress={enabled ? onPress : undefined}
//     onLongPress={enabled ? onPress : undefined}
//     hitSlop={{ top: 20, bottom: 20, left: 20, right: 30 }}
//     activeOpacity={theme.metrics.opacity}
//   >
//     <View style={styles.container}>
//       <Icon
//         name={Platform.select({ ios: 'chevron-left', android: 'arrow-back' })}
//         color={enabled ? theme.colors.secondary : theme.colors.secondary}
//         underlayColor="transparent"
//         iconStyle={Platform.select({ ios: styles.iosIcon, android: styles.androidIcon })}
//         size={Platform.select({ ios: 35, android: 25 })}
//       />
//       <Text style={styles.text}>{Platform.select({ ios: 'Back', android: '' })}</Text>
//     </View>
//   </TouchableOpacity>
// );
//# sourceMappingURL=BackButton.js.map