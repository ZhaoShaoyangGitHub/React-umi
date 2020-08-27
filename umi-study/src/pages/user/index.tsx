import React, { useEffect } from 'react';
import styles from './index.less';
import { connect } from 'umi';
import { ConnectProps, ConnectState, UserModelState } from '@/models/connect';
import Header from './Header';
import MyList from './MyList';
import Logout from './Logout';

interface UserPorps extends ConnectProps {
  user: UserModelState;
}

const User: React.FC<UserPorps> = ({ dispatch, user }) => {
  const { name, icon } = user.detail;
  const logout = () => {
    dispatch({ type: 'user/logout' });
  };
  useEffect(() => {
    dispatch({
      type: 'user/getDetail',
    });
  }, []);
  return (
    <div>
      <Header name={name} icon={icon} />
      <MyList />
      <Logout logout={logout} />
    </div>
  );
};
export default connect(({ user }: ConnectState) => ({ user }))(User);
