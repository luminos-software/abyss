## Abyss - library containing code that should be used by all Luminos React Native projects

### Why _Abyss_?

For now the library is supposed to be an endless pit of infrastructure code that can be reused throughout projects. Possibly it will evolve in time into separate packages for specific purposes.

### Redux, API, Offline support

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
