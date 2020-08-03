import React from "react";
import styles from "./index.module.scss";
import FooterFlyDan from "../FooterFlyDan";
import {getList} from "../../guardians/api";

interface moduleProps {
  className?: any;
}

type StateType = {
  [propsName: string]: any;
};

interface QRcode {
  props: moduleProps;
  state: StateType;
}

class QRcode extends React.Component<moduleProps> {
  state: StateType = {
    joinLogoList: [],
  };

  componentDidMount() {
    const arr: any = [
      {
        imgUrl: require("../../guardians/img/data_img/sank/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/stump/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/pdpum/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/wild/logo.png").default,
        logoH: 24,
      },
      {
        imgUrl: require("./logo_2/p-l.png").default,
        logoH: 24,
      },
      {
        imgUrl: require("./logo_2/k-l.png").default,
        logoH: 64 / 2,
      },
      {
        imgUrl: require("./logo_2/r-l.png").default,
        logoH: 32,
      },
      {
        imgUrl: require("./logo_2/m-l.png").default,
        logoH: 72 / 2,
      },
      {
        imgUrl: require("../../guardians/img/data_img/lovely/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/moster/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/huhu/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/chaos/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/planetbear/logo.png")
          .default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/Sean/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/muzzy/logo.png").default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/woworks/logo.png")
          .default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/zaiyiART/logo.png")
          .default,
        logoH: 34,
      },
      {
        imgUrl: require("../../guardians/img/data_img/MTStudio/logo.png")
          .default,
        logoH: 34,
      },
    ];

    this.setState({
      joinLogoList: arr,
    });
  }

  render() {
    const {className} = this.props;
    const {mainLogoList, joinLogoList} = this.state;
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <div className={styles.moudleTitle}>
          <FooterFlyDan />
        </div>
        <div className={styles.contentBox}>
          <div className={`${styles.logoBox} ${styles.b20}`}>
            <div className={styles.title}>「玩具守护者」主办方</div>
            <div className={styles.imgList}>
              <div className={styles.logo}>
                <img src={require("./img/logo-main.svg").default} alt="" />
              </div>
            </div>
          </div>

          <div className={styles.logoBox}>
            <div className={styles.title}>「玩具守护者」已公布合作方</div>
            <div className={styles.imgList}>
              {joinLogoList.map((item: any, index: number) => {
                return (
                  <div
                    className={styles.logo}
                    key={index}
                    style={
                      item.logoH && {
                        height: `${item.logoH / 100}rem`,
                      }
                    }
                  >
                    <img src={item.imgUrl} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.pageEnd}>*本活动最终解释权归盒DAN所有*</div>
        </div>
      </div>
    );
  }
}
export default QRcode;
