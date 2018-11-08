import React from 'react';
import { TextProps } from 'react-native';
import { HeaderTitle } from 'react-navigation';
import { connect } from 'react-redux';

type HeaderTitleProps = TextProps & { title: string };
const HeaderTitleView: React.SFC<HeaderTitleProps> = ({ title, ...props }) => (
  <HeaderTitle {...props}>{title}</HeaderTitle>
);

export const connectTitle = <State extends {}>(mapStateToProps: (state: State) => HeaderTitleProps) =>
  connect(mapStateToProps)(HeaderTitleView);
