import React, { useEffect } from 'react';
import BottomNav from '@/conponents/BottomNav/index';
import '@/static/iconfont/iconfont.css';

interface BasiclayoutProps {}

const Basiclayout: React.FC<BasiclayoutProps> = props => {
  const { children } = props;
  useEffect(() => {}, []);
  return (
    <div>
      <article>{children}</article>
      <BottomNav />
    </div>
  );
};

export default Basiclayout;
