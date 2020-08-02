import { getUserInfo } from '@/services/user';
import { Effect, Reducer } from 'umi';

interface CurrentUser {
  name?: string;
  icon?: string;
  userid?: string;
}

interface DetailUser {
  name: string;
  icon: string;
  userid: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *getUserInfo(_, { call, put }) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'saveUser',
        payload: { currentUser: { ...response } },
      });
    },
  },
  reducers: {
    saveUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default UserModel;
