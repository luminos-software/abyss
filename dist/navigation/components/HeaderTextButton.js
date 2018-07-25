"use strict";
// import { Text } from 'lib/Text';
// import React from 'react';
// import { TouchableOpacity } from 'react-native';
// import { theme } from 'theme';
// import { styles } from './styles/HeaderTextButtonStyles';
// interface IProps {
//   onPress: () => void;
//   enabled?: boolean;
//   title: string;
// }
// export const HeaderTextButton: React.SFC<IProps> = ({ onPress, enabled = true, title }) => {
//   const onPressFunc = enabled ? onPress : () => null;
//   const opacity = enabled ? 1 : theme.metrics.opacity;
//   return (
//     <TouchableOpacity
//       onPress={onPressFunc}
//       onLongPress={onPressFunc}
//       activeOpacity={enabled ? theme.metrics.opacity : 1}
//       hitSlop={{ top: 20, bottom: 20, left: 20, right: 30 }}
//     >
//       <Text style={[styles.text, { color: theme.colors.snow, opacity }]}>{title}</Text>
//     </TouchableOpacity>
//   );
// };
//# sourceMappingURL=HeaderTextButton.js.map