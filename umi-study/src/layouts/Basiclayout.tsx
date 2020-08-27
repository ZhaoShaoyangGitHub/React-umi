import React, { useEffect } from 'react';
import BottomNav from '@/components/BottomNav/index';
import { Location, connect, Dispatch } from 'umi';
import '@/static/iconfont/iconfont.css';
import styles from './BasicLayout.less';
import { ConnectProps, ConnectState, UserModelState } from '@/models/connect';

interface BasicLayoutProps extends ConnectProps {
  user: UserModelState;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children, location, dispatch, user } = props;
  useEffect(() => {
    //获取用户基本信息
    dispatch &&
      dispatch({
        type: 'user/getUserInfo',
      });
    return;
  }, []);
  const showBottomNav = location.pathname !== '/login';
  return (
    <div className={styles.main}>
      <article>{children}</article>
      <footer>
        {showBottomNav && <BottomNav pathname={location.pathname} />}
      </footer>
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(BasicLayout);
