import { Location, Dispatch } from 'umi';
import { UserModelState } from './user';
import { CartModelState } from './cart';

export interface ConnectProps {
  location: Location & { state: { from: string } };
  dispatch: Dispatch;
}

export interface ConnectState {
  user: UserModelState;
  cart: CartModelState;
}
}

export { UserModelState };
export { CartModelState };
