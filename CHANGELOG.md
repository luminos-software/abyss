## Only breaking changes are listed here

### 0.5.2

Remove the offline support

### 0.5.1

Remove the navigation helpers

### 0.5.0

Replace TSLint with ESLint

### 0.4.8

Add `parseLicenses`.

### 0.4.7

Rename `DevToolsScreen` to `ThemeSelectorScreen`.

### 0.4.6

Add `viewStyle`, `textStyle`, `imageStyle` as new best practice.

### 0.4.5

Move `StackNavigator.connectTitle()` to the top level so `StackNavigator` doesn't depend on redux.

### 0.4.0

Switch to `react-native-typescript-transformer` and `ts-jest`. Rename the `redux` directory to `state`.

### 0.3.5

Change the `react-native-actioncable` typings to match `@types/actioncable` more closely.

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
