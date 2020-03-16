import { NavigationAction, NavigationContainerComponent, NavigationNavigateActionPayload, NavigationResetActionPayload, NavigationState } from 'react-navigation';
export declare const Navigation: {
    setNavigator(navigationContainer: NavigationContainerComponent): void;
    getCurrentScreen(navState?: NavigationState | undefined): import("react-navigation").NavigationLeafRoute<import("react-navigation").NavigationParams> | import("react-navigation").NavigationStateRoute<import("react-navigation").NavigationParams> | null;
    dispatch(action: NavigationAction): boolean;
    navigate(routeName: string, options?: Partial<NavigationNavigateActionPayload> | undefined): boolean;
    back(): boolean;
    reset(options: NavigationResetActionPayload): boolean;
    toggleDrawer(): boolean;
    openDrawer(): boolean;
    closeDrawer(): boolean;
};
