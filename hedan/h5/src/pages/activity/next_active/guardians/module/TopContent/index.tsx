import React from "react";
import styles from "./index.module.scss";
import Header from "@/components/ActivityHeader";

const win: any = window;
const browserType = win.markComm.browserType();

const isHedanApp = browserType.isHedanApp;

const TopContent = () => {
  return (
    <div className={styles.wrapper}>
      {!isHedanApp && <Header className={styles.header} />}
      {!isHedanApp && <div className={`${styles.line}`}></div>}
      <div className={styles.topBG}>
        <img
          className={`${styles.danFly} ${styles.jump_5}`}
          src={require("../../img/dan_fly.png").default}
          alt=""
        />
        <div className={styles.cloudBox}>
          <img
            className={`${styles.cloud_1}`}
            src={require("../../img/cloud_1.svg").default}
            alt=""
          />
          <img
            className={`${styles.cloud_2}`}
            src={require("../../img/cloud_2.svg").default}
            alt=""
          />
          <img
            className={`${styles.cloud_3}`}
            src={require("../../img/cloud_3.svg").default}
            alt=""
          />
          <img
            className={`${styles.cloud_4}`}
            src={require("../../img/cloud_4.svg").default}
            alt=""
          />
        </div>
      </div>

      <div className={styles.titleBox}>
        <div className={styles.title}>
          快来
          <span>盒DAN</span>
          成为
        </div>
        <img
          className={styles.titleImg}
          src={require("./img/title.png").default}
          alt=""
        />
        <div className={styles.desc}>
          <p>各种限定徽章、专属玩具柜皮肤100%解锁，</p>
          <p className={styles.contB}>
            更有大奖「一年内玩具优先购买权」 等候各位守护者的到来哦~
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopContent;
