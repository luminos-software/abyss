declare module 'react-native-actioncable' {
  interface IActionCableSubscription {
    perform: (action: string, data: any) => void;
    unsubscribe: () => void;
  }

  interface IActionCableConsumer {
    disconnect(): void;

    subscriptions: {
      create<S>(
        { channel }: { channel: string },
        data: Partial<IActionCableSubscription> & { received?: (data: S) => void }
      ): IActionCableSubscription;
    };
  }

  function createConsumer(url: string): IActionCableConsumer;
}
