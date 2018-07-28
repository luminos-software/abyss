import { NavigationAction, NavigationCloseDrawerAction, NavigationContainerComponent, NavigationNavigateActionPayload, NavigationOpenDrawerAction, NavigationResetActionPayload, NavigationState, NavigationToggleDrawerAction } from 'react-navigation';
declare type NavigationActionHack = NavigationAction | NavigationToggleDrawerAction | NavigationOpenDrawerAction | NavigationCloseDrawerAction;
export declare const Navigation: {
    setNavigator(navigationContainer: NavigationContainerComponent): void;
    getCurrentScreen(navState?: NavigationState | undefined): string | null;
    dispatch(action: NavigationActionHack): boolean;
    navigate(routeName: string, options?: Partial<NavigationNavigateActionPayload> | undefined): boolean;
    back(): boolean;
    reset(options: NavigationResetActionPayload): boolean;
    toggleDrawer(): boolean;
    openDrawer(): boolean;
    closeDrawer(): boolean;
};
export {};
