import React from 'react';
import { TextProps } from 'react-native';
declare type HeaderTitleProps = TextProps & {
    title: string;
};
export declare const connectTitle: <State extends {}>(mapStateToProps: (state: State) => HeaderTitleProps) => import("react-redux").ConnectedComponentClass<React.StatelessComponent<HeaderTitleProps>, Pick<HeaderTitleProps, never>>;
export {};
