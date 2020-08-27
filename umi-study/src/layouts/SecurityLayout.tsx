import React from 'react';
import { connect, Redirect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';

interface SecurityLayoutProps extends ConnectProps {
  user: UserModelState;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const { children, location, user } = props;
  const { userid } = user.currentUser;
  const isLogin = !!userid;
  console.log(location);
  if (!isLogin) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    );
  }
  return children;
};

export default connect(({ user }: ConnectState) => ({ user }))(SecurityLayout);
