import React, { useEffect } from 'react';
import BottomNav from '@/components/BottomNav/index';
import { Location, connect, Dispatch } from 'umi';
import '@/static/iconfont/iconfont.css';
import styles from './BasicLayout.less';

interface BasicLayoutProps {
  location: Location;
  dispatch: Dispatch;
  user: any;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children, location, dispatch, user } = props;
  console.log(props);
  useEffect(() => {
    //获取用户基本信息
    dispatch &&
      dispatch({
        type: 'user/getUserInfo',
      });
    return;
  }, []);
  return (
    <div className={styles.main}>
      <article>{children}</article>
      <footer>
        <BottomNav pathname={location.pathname} />
      </footer>
    </div>
  );
};

export default connect(({ user }) => ({ user }))(BasicLayout);
