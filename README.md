## Abyss - code that should be used by all Luminos React Native projects

### Why _Abyss_?

For now the library is supposed to be an endless pit of infrastructure code that can be reused throughout projects. Possibly it will evolve into separate packages for specific purposes, or I will spend some time organizing the code better, but for now it is more of a dump :).

### Features

## Direct API interaction

API configuration (`config/abyss.ts` usually):

```typescript
import { AbyssConfig } from 'abyss';

AbyssConfig.api.serverUrl = Config.SERVER_URL;

// optional
AbyssConfig.api.prefix: '/api/v1';
AbyssConfig.api.timeout = 4000;
```

After that you can dispatch API call actions:

```typescript
ApiActions.directCall(alarmRepository.toggleAlarm({ alarmActive: false }), DatastoreActions.updateAlarm, {});
```

### Configuration

Typical Redux store creation:

```typescript
import { apiMiddleware, defaultOfflineConfig, offlineEpics, ReduxUtil } from 'abyss';

const epicMiddleware = createEpicMiddleware<Action, Action, IRootState>();

const offlineEnhancer = offline({
  ...defaultOfflineConfig,
  persistCallback: () => store.dispatch(AppActions.startup()),
  persistOptions: {
    blacklist: ['volatile', 'home']
  }
  // other redux-offline settings
});

const enhancer: StoreEnhancer<IRootState> = compose(
  offlineEnhancer,
  applyMiddleware(apiMiddleware, epicMiddleware)
);
const reducer: Reducer<IRootState> = combineReducers(reducers);

export const store: Store<IRootState> = createStore(reducer, enhancer);

epicMiddleware.run(ReduxUtil.combineEpics(offlineEpics, epics));
```
