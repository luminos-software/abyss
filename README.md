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

export const reducer = reducerWithInitialState
.caseWithAction(DatastoreActions.refreshDay, (state, action) => ({ ...state, day: action.payload }))(initialState).build();
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

## Configuration

### Direct API interaction

API configuration (`config/abyss.ts` usually):

```typescript
import { AbyssConfig, Api } from 'abyss';

AbyssConfig.api.serverUrl = Config.SERVER_URL;

// optional
AbyssConfig.api.prefix: '/api/v1';
AbyssConfig.api.timeout = 4000;

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
