## Abyss - code that should be used by all Luminos React Native projects

## Why _Abyss_?

For now the library is supposed to be an endless pit of infrastructure code that can be reused throughout projects. Possibly it will evolve into separate packages for specific purposes, or I will spend some time organizing the code better, but for now it is more of a dump :).

## Usage

### Direct API interaction

First define a repository (`repositories/dayRepository.ts`):

```typescript
import { Repository } from 'abyss';
import { IDayModel } from 'models';

const repository = new Repository<IDayModel>();

export const dayRepository = {
  persistDay({ day }: { day: IDayModel }) {
    return repository.post<{ date: string }>('/days', {
      data: {
        attributes: {
          date: day.date
        }
      }
    });
  }
};
```

Then add an async action that will be used to track the API call progress and get the response (`redux/datastoreReducer.ts`):

```typescript
import { IApiError } from 'abyss';
import { IDayModel } from 'models';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory('datastore');

export const DatastoreActions = {
  refreshDay: actionCreator.async<{ day: IDayModel }, IDayModel, IApiError>('REFRESH_DAY')
};

export type State = Readonly<{
  day: IDayModel | null;
}>;

const initialState: State = {
  day: null;
};

export const reducer = reducerWithInitialState(initialState)
  .caseWithAction(DatastoreActions.refreshDay.done, (state, action) => ({ ...state, day: action.payload }))
  .case(DatastoreActions.refreshDay.failed, state => ({ ...state, day: null }))
  .build();
```

Then dispatch an API call action (`epics/homeEpics.ts`):

```typescript
import { ApiActions } from 'config/abyss';

export const persistDay: Epic<Action, Action, IRootState> = action$ =>
  action$.pipe(
    filter(HomeActions.buttonPressed.match),
    map(action =>
      ApiActions.directCall(dayRepository.persistDay({ day: action.payload }), DatastoreActions.refreshDay, {})
    )
  );
```

### Offline support

Mark the repository action as offline-capable in `config/abyss.ts`:

```typescript
const offlineCalls = {
  'dayRepository.persistDay': dayRepository.persistDay
};
AbyssConfig.api.offlineCalls = offlineCalls;
```

And instead of dispatching `ApiActions.directCall`, `ApiActions.offlineCall` should be used:

```typescript
ApiActions.offlineCall('dayRepository.persistDay', DatastoreActions.refreshDay, {
  day: state$.value.home.currentDay
});
```

### Clean the redux store

Set a new `reducerVersion` in `config/abyss.ts`:

```typescript
AbyssConfig.redux.reducerVersion = '1'; // default 0
```

### Theme metrics

In `theme/metrics.ts`:

```typescript
import { getMetrics } from 'abyss';

export const metrics = {
  ...getMetrics(),
  otherCustomMetric: 10
};
```

### Navigation

Create navigators:

```typescript
import { createTabNavigator, createStackNavigator } from 'abyss';

export const Navigator = createTabNavigator({ Home: HomeScreen });
```

Create screens:

```typescript
import { StackScreen } from 'abyss';

// also StackScreen.withoutHeader
export const MedicinesScreen = StackScreen.withDefaultHeader(MedicinesConnected, {
  headerTitle: 'Medicines'
});
```

## Configuration

### Direct API interaction

API configuration (`config/abyss.ts` usually):

```typescript
import { AbyssConfig, Api } from 'abyss';

// mandatory, everything else is optional
AbyssConfig.api.serverUrl = Config.SERVER_URL;

AbyssConfig.api.prefix: '/api/v1';
AbyssConfig.api.timeout = 4000;

// these calls will reset the auth token; an `auth_token` attribute is expected on the response
AbyssConfig.api.authCalls = ['login/LOG_IN_DONE', 'login/CREATE_USER_ACCOUNT_DONE'];

// manually set the auth token
Api.setAuthToken(getUniqueID());
```

### Offline support

First configure the list of offline-capable calls (usually `config/abyss.ts`):

```typescript
const offlineCalls = {
  'userRepository.persistUser': userRepository.persistUser,
  'dayRepository.persistDay': dayRepository.persistDay
};
AbyssConfig.api.offlineCalls = offlineCalls;
```

Next configure an `ApiActions` wrapper that will give us typing based on those actions (usually `config/abyss.ts`):

```typescript
import { ApiActions as AbyssApiActions, Arguments, InferFromAxiosReturnType } from 'abyss';

export const ApiActions = {
  ...AbyssApiActions,
  offlineCall<
    C extends typeof offlineCalls,
    A extends keyof C,
    P extends Arguments<C[A]>,
    S extends InferFromAxiosReturnType<C[A]>,
    E
  >(action: A, asyncAction: AsyncActionCreators<P, S, E>, params: P) {
    return AbyssApiActions.offlineCall<A, P, S, E>(action, asyncAction, params);
  }
};
```

### Typical Redux store

```typescript
import { apiMiddleware, defaultOfflineConfig, offlineEpics } from 'abyss';

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

epicMiddleware.run(combineEpics(...R.values(R.mergeAll([offlineEpics, epics]))));
```

### Redux offline reducer

```typescript
import { offlineReducer, OfflineState } from 'abyss';
import { reducer as homeReducer, State as HomeState } from '../modules/home/reducer';

export const reducers = {
  home: homeReducer,
  offline: offlineReducer
};

export interface IRootState {
  home: HomeState;
  offline: OfflineState;
}
```

### Navigation header styles

```typescript
// config/abyss.ts
import { StackScreen } from 'abyss';

StackScreen.setDefaults({ headerStyle: { backgroundColor: 'red' } });
```
