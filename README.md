## Abyss - code that should be used by all Luminos React Native projects

## Why _Abyss_?

For now the library is supposed to be an endless pit of infrastructure code that can be reused throughout projects. Possibly it will evolve into separate packages for specific purposes, or I will spend some time organizing the code better, but for now it is more of a dump :).

## Usage

### Direct API interaction

First define a repository:

```typescript
// repositories/dayRepository.ts
import { Repository } from 'abyss';
import { IDayModel } from 'models';

const repository = new Repository<IDayModel>();

export const dayRepository = {
  getDay(id: string) {
    return repository.get(`/days/${id}`);
  },

  persistDay(day: IDayModel) {
    return repository.post<{ date: string }>('/days', {
      data: { attributes: { date: day.date } }
    });
  }
};
```

Then add an async action that will be used to track the API call progress and get the response:

```typescript
// redux/datastoreReducer.ts
import { ApiError } from 'abyss';
import { IDayModel } from 'models';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory('datastore');

export const DatastoreActions = {
  refreshDay: actionCreator.async<{ day: IDayModel }, IDayModel, ApiError>('REFRESH_DAY')
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

Then dispatch an API call action:

```typescript
// epics/homeEpics.ts
import { ApiActions } from 'config/abyss';

export const persistDay: Epic<Action, Action, IRootState> = action$ =>
  action$.pipe(
    filter(HomeActions.buttonPressed.match),
    map(action =>
      ApiActions.directCall(dayRepository.persistDay({ day: action.payload }), DatastoreActions.refreshDay, {})
    )
  );
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

### Transloadit

Assuming Transloadit is enabled in the store sonfig, simply dispatch an action:

```typescript
  Transloadit.action(
      uri: string,
      template: string,
      asyncAction: AsyncActionCreators<P, S, E>,
      extraParams: Record<string, string> = {}
  )
```

## Configuration

### Config files

```json
// tsconfig.json
{
  "extends": "./node_modules/abyss/config/tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "artifacts",
    "baseUrl": "src/"
  },
  "exclude": ["android", "ios", "build", "node_modules", "scripts", "assets"]
}

// .eslintrc.js
module.exports = {
  extends: './node_modules/abyss/config/.eslintrc.js',
};

// babel.config.js
module.exports = {
  extends: './node_modules/abyss/config/.babelrc',
};
```

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
// and other headers
Api.setHeader('Accept', 'application/json');
```

### Typical Redux store

```typescript
import { createReduxStore } from 'abyss';
import { Store } from 'redux';
import * as epics from '../epics';
import { AppActions } from '../modules/reducer';
import { IRootState, reducers } from './reducers';

export const store: Store<IRootState> = createReduxStore(epics, reducers, {
  offline: {
    persistCallback: () => store.dispatch(AppActions.startup()),
    persistOptions: {
      blacklist: ['volatile', 'hive', 'home', 'camera', 'welcome']
    }
  },
  logger: true,
  transloadit: true
});
```

### Transloadit

```typescript
// redux/store.ts
import { transloaditMiddleware } from 'abyss';
...
applyMiddleware(apiMiddleware, transloaditMiddleware, epicMiddleware, loggerMiddleware)
...

// config/abyss.ts
AbyssConfig.transloadit.key = Config.TRANSLOADIT_KEY;
AbyssConfig.transloadit.secret = Config.TRANSLOADIT_SECRET;
AbyssConfig.transloadit.templates = {
  image: Config.TRANSLOADIT_IMAGE_TEMPLATE,
  video: Config.TRANSLOADIT_VIDEO_TEMPLATE,
  profile: Config.TRANSLOADIT_PROFILE_IMAGE_TEMPLATE
};
AbyssConfig.transloadit.progressAction = VolatileActions.updateUploadProgress;
AbyssConfig.transloadit.notifiyUrl = `${Config.SERVER_URL}/transloadit/file_upload`;
```
