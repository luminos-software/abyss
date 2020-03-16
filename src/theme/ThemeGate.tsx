import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { AbyssConfig } from '../config';

interface IState {
  finished: boolean;
}

export class ThemeGate extends React.PureComponent<
  { render?: () => JSX.Element; onLoadFinished?: () => void },
  IState
> {
  state: IState = { finished: false };

  componentDidMount() {
    AsyncStorage.getItem('theme.colors')
      .then(jsonColors => {
        const storedColors: Partial<typeof AbyssConfig.theme.colors> = JSON.parse(jsonColors || '{}');
        Object.keys(storedColors).forEach(color => {
          const typedColor = color as keyof typeof AbyssConfig.theme.colors;
          AbyssConfig.theme.colors[typedColor] = storedColors[typedColor]!;
        });

        this.props.onLoadFinished && this.props.onLoadFinished();
      })
      .then(() => this.setState({ finished: true }));
  }

  render() {
    if (this.state.finished) {
      return this.props.render ? this.props.render() : this.props.children;
    }
    return null;
  }
}
