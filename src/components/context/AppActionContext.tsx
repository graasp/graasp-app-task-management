import { List } from 'immutable';

import React, { FC, PropsWithChildren, createContext, useMemo } from 'react';

import { AppActionRecord } from '@graasp/sdk/frontend';

import { hooks, mutations } from '../../config/queryClient';
import Loader from '../common/Loader';

type PostAppActionType = {
  data: { [key: string]: unknown };
  type: string;
};

export type AppActionContextType = {
  postAppAction: (payload: PostAppActionType) => void;
  appActionArray: List<AppActionRecord>;
};

const defaultContextValue = {
  postAppAction: () => null,
  appActionArray: List<AppActionRecord>(),
};

const AppActionContext =
  createContext<AppActionContextType>(defaultContextValue);

export const AppActionProvider: FC<PropsWithChildren> = ({ children }) => {
  const appAction = hooks.useAppActions();

  const { mutate: postAppAction } = mutations.usePostAppAction();

  const contextValue: AppActionContextType = useMemo(
    () => ({
      postAppAction: (payload: PostAppActionType) => {
        postAppAction(payload);
      },
      appActionArray: appAction.data || List<AppActionRecord>(),
    }),
    [appAction.data, postAppAction],
  );

  if (appAction.isLoading) {
    return <Loader />;
  }

  return (
    <AppActionContext.Provider value={contextValue}>
      {children}
    </AppActionContext.Provider>
  );
};

export const useAppActionContext = (): AppActionContextType =>
  React.useContext<AppActionContextType>(AppActionContext);
