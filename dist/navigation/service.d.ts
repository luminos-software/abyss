import { NavigationAction, NavigationContainerComponent, NavigationNavigateActionPayload, NavigationResetActionPayload, NavigationState } from 'react-navigation';
export declare const Navigation: {
    setNavigator(navigationContainer: NavigationContainerComponent): void;
    getCurrentScreen(navState?: NavigationState | undefined): string | null;
    dispatch(action: NavigationAction): boolean;
    navigate(routeName: string, options?: Partial<NavigationNavigateActionPayload> | undefined): boolean;
    back(): boolean;
    reset(options: NavigationResetActionPayload): boolean;
    toggleDrawer(): boolean;
    openDrawer(): boolean;
    closeDrawer(): boolean;
};
