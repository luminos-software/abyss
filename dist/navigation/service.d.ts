import { NavigationContainerComponent, NavigationNavigateActionPayload, NavigationResetActionPayload } from 'react-navigation';
export declare const Navigation: {
    setNavigator(navigationContainer: NavigationContainerComponent): void;
    getCurrentScreen(): string | null;
    dispatch(action: import("react-navigation").NavigationStackAction): boolean;
    navigate(routeName: string, options?: Partial<NavigationNavigateActionPayload> | undefined): boolean;
    back(): boolean;
    reset(options: NavigationResetActionPayload): boolean;
};
