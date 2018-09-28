declare module 'react-native-actioncable' {
  interface Channel {
    unsubscribe(): void;
    perform(action: string, data: {}): void;
    send(data: Object): boolean;
  }

  interface Subscriptions {
    create<T>(channel: string | ChannelNameWithParams, obj: CreateMixin<T>): Channel;
  }

  interface Cable {
    subscriptions: Subscriptions;
    disconnect(): void;
  }

  interface CreateMixin<T> {
    connected?(): void;
    disconnected?(): void;
    received(obj: T): void;
  }

  interface ChannelNameWithParams {
    channel: string;
    [key: string]: any;
  }

  function createConsumer(): Cable;
  function createConsumer(url: string): Cable;

  interface AppInterface {
    cable?: Cable;
    network?: Channel;
  }
}
