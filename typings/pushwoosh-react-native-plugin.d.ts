declare module 'pushwoosh-react-native-plugin' {
  function init(
    config: { pw_appid: string; project_number: string },
    success?: () => void,
    fail?: (error: string) => void
  ): void;

  function register(success?: (token: string) => void, fail?: (error: string) => void): void;
  function unregister(success?: (token: string) => void, fail?: (error: string) => void): void;
  function setTags(tags: Record<string, any>, success?: (token: string) => void, fail?: (error: string) => void): void;
  function getTags(success: (tags: Record<string, any>) => void, fail?: (error: string) => void): void;

  function setShowPushnotificationAlert(showPushnotificationAlert: boolean): void;
  function getShowPushnotificationAlert(callback: (showPushnotificationAlert: boolean) => void): void;
  function getPushToken(callback: (token: string) => void): void;
  function getHwid(callback: (hwid: string) => void): void;
  function setUserId(userId: string): void;

  function postEvent(event: string, attributes?: Record<string, any>): void;
  function startLocationTracking(): void;
  function stopLocationTracking(): void;

  function setApplicationIconBadgeNumber(badgeNumber: number): void;
  function getApplicationIconBadgeNumber(callback: (badgeNumber: number) => void): void;
  function addToApplicationIconBadgeNumber(badgeNumber: number): void;

  function setMultiNotificationMode(on: boolean): void;
  function setLightScreenOnNotification(on: boolean): void;
  function setEnableLED(on: boolean): void;
  function setColorLED(color: number): void;
  function setSoundType(type: 0 | 1 | 2): void;
  function setVibrateType(type: 0 | 1 | 2): void;

  function presentInboxUI(style?: {
    dateFormat?: string;
    defaultImageIcon?: string;
    unreadImage?: string;
    listErrorImage?: string;
    listEmptyImage?: string;
    listErrorMessage?: string;
    listEmptyMessage?: string;
    defaultTextColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    highlightColor?: string;
    titleColor?: string;
    readTitleColor?: string;
    descriptionColor?: string;
    readDescriptionColor?: string;
    dateColor?: string;
    readDateColor?: string;
    dividerColor?: string;
  }): void;
  function showGDPRConsentUI(): void;
  function showGDPRDeletionUI(): void;
  function isDeviceDataRemoved(success: (isRemoved: boolean) => void): void;
  function isCommunicationEnabled(success: (enabled: boolean) => void): void;
  function isAvailableGDPR(success: (enabled: boolean) => void): void;
  function setCommunicationEnabled(
    enable: boolean,
    success?: (enabled: boolean) => void,
    fail?: (error: string) => void
  ): void;
  function removeAllDeviceData(success?: () => void, fail?: (error: string) => void): void;
}
