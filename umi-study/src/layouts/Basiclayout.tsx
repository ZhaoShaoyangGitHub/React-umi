import React, { useEffect } from 'react';
import BottomNav from '@/conponents/BottomNav/index';
import '@/static/iconfont/iconfont.css';
import { Location, connect, Dispatch } from 'umi';
import styles from './Basiclayout.less';

interface BasiclayoutProps {
  location: Location;
  dispatch: Dispatch;
  user: any;
}

const Basiclayout: React.FC<BasiclayoutProps> = props => {
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

export default connect(({ user }) => ({ user }))(Basiclayout);
