import { Context, PermissionLevel } from '@graasp/sdk';

// todo: use graasp-sdk
export const CONTEXTS = {
  BUILDER: 'builder',
  PLAYER: 'player',
  ANALYZER: 'analyzer',
  STANDALONE: 'standalone',
} as const;

export const DEFAULT_MOCK_SETTING = {
  content: 'I am a mock',
};

export const DEFAULT_CONTEXT = Context.BUILDER;
export const DEFAULT_PERMISSION = PermissionLevel.Read;

export const DEFAULT_CONTEXT_LANGUAGE = 'en';
