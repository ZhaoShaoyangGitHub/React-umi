import React from "react";
import styles from "./index.module.scss";

interface moduleProps {
  active?: Number;
  onClose: Function;
  jobs: any[];
}

type StateType = {
  [propsName: string]: any;
};

interface Module {
  props: moduleProps;
  state: StateType;
}

class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    active: 0,
    jobs: [],
    onClose: () => {},
  };

  state: StateType = {
    active: 0,
    jobs: [],
  };

  componentDidMount() {
    const { active, jobs } = this.props;
    this.setState({
      active,
      jobs,
    });
  }

  UNSAFE_componentWillMount() {}

  switch = (active: Number) => {
    this.setState({
      active,
    });
  };

  render() {
    const { active, jobs } = this.state;
    const list = jobs;
    return (
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <img
            className={styles.logo}
            src={require("@/assets/image/header-logo.png").default}
            alt=""
          />
          <img
            className={styles.cloes}
            onClick={() => {
              this.props.onClose();
            }}
            src={require("@/assets/image/x.png").default}
            alt=""
          />
        </div>
        {/*  */}
        <div className={styles.contBox}>
          <div className={styles.left}>
            <div className={styles.header}>
              <div className={styles.title}>盒DAN目前正在招聘</div>
              <div className={styles.nav}>
                {list.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`${styles.tab} ${
                        active === index ? styles.active : ""
                      }`}
                      onClick={() => {
                        this.switch(index);
                      }}
                    >
                      {item.jobName}
                    </div>
                  );
                })}
              </div>
              <div className={styles.location}>
                工作地址： <br />
                上海市杨浦区国权北路1688弄（湾谷科技园）67号一层
                <div className={styles.nill}></div>
                做五休二 / 弹性制度 / 办公环境好
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.contactWay}>
                有意者请添加微信
                <br />
                <span className={styles.lineMe}>HirokazuKoreeda</span>
                <div className={styles.nill}></div>
                或带上自己的简历发送至邮箱
                <br />
                <span className={styles.lineMe}>66@hedan.com</span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.content}>
              {list.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={`${styles.contTxt} ${
                      active === index ? styles.active : ""
                    }`}
                  >
                    <div className={styles.title}>{item.title}</div>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{
                        __html: item.detail,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Module;
