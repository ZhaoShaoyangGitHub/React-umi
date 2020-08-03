import { Location, Dispatch } from 'umi';
import { UserModelState } from './user';

export interface ConnectProps {
  location: Location & { state: { from: string } };
  dispatch: Dispatch;
}

export interface ConnectState {
  user: UserModelState;
}

export { UserModelState };
