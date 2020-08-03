import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

class Page extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.question}>
          <div className={styles.title}>为什么需要邀请码？</div>
          <div className={styles.cont}>
            目前盒DAN正在内测<span className={styles.BUG}>（BUG）</span>
            阶段，有很多功能还不够稳定，只能容纳一小部分用户参与试用，敬请谅解，我们会努力孵化这颗DAN，让它尽快破壳而出哒！
          </div>
        </div>

        <div className={styles.how}>
          <div className={styles.title}>如何获得邀请码？</div>
          <div className={styles.item}>
            <div className={styles.q}>1. 如果你非常喜欢并擅长拍摄玩具：</div>
            <div className={styles.cont}>
              添加盒DAN孵蛋员微信（heDANkefu）、新浪微博（@盒DAN
              ）或Instagram账号（@imhedaner），私信我们你的玩具摄影/定格动画/视频作品，孵蛋员一旦通过审核，会尽快将邀请码私信发送给你哒~
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.q}>2. 如果你有朋友是盒DAN内测用户： </div>
            <div className={styles.cont}>
              可以联系TA索要邀请码，每个内测用户都可以邀请至少一个朋友加入盒DAN，进行内测
              <span className={styles.BUG}>（BUG）</span>体验~
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.q}>3. 如果你是玩具设计师：</div>
            <div className={styles.cont}>
              添加盒DAN孵蛋员微信（heDANkefu），发送你的玩具作品/玩具品牌，孵蛋员一旦通过审核，会尽快将邀请码私信发送给你哒~
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.str1}>
            盒DAN的内测
            <span className={styles.blue}>将会持续1~2个月的时间</span>
            ，等产品稳定后将会正式开放无需邀请码的公测。
          </div>
          <div className={styles.str2}>
            具体公测时间还请留意我们的微信公众号
            <span className={styles.blue}>（imhedaner）</span>或我们的官方微博
            <span className={styles.blue}>@盒DAN</span>
          </div>
        </div>

        <img
          className={styles.egg1}
          src={require("./img/egg_han.png").default}
          alt=""
        />
        <img
          className={styles.egg2}
          src={require("./img/egg_s.png").default}
          alt=""
        />
        <img
          className={styles.egg_big}
          src={require("./img/big_egg.png").default}
          alt=""
        />
      </div>
    );
  }
}
export default Page;
