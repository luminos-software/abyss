import { TextProps } from 'react-native';
declare type HeaderTitleProps = TextProps & {
    title: string;
};
export declare const connectTitle: <State extends {}>(mapStateToProps: (state: State) => HeaderTitleProps) => any;
export {};
