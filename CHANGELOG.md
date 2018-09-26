### 0.3.2

Replace `react-native-fetch-blob` with `rn-fetch-blob`.

### 0.3.0

React Native 0.57 is now required.

### 0.2.2

Add `Api.setHeader()`.

### 0.2.1

Moved some common types. All projects should change `typings/index.d.ts` to `import 'abyss/typings';` and remove most custom types.

### 0.2.0

Add `DevToolsScreen` and `ThemeGate`. All projects should:

- set `AbyssConfig.theme.colors`;
- add `DevToolsScreen` to the navigator;
- use `ThemeGate` in `RootContainer` to render the navigator lazily;
- navigation defaults should be set on `ThemeGate.onLoadFinished`.

### 0.1.7

Add `config/.babelrc`. All projects should extends this.

### 0.1.5

Add `StackScreen.connectTitle()` as a way of changing a screen title with redux data.

### 0.1.4

Add `StackScreen.BackButton`. All custom back buttons should be replaced by this component.

### 0.1.0

Initial release.
