import React from "react";
import styles from "./index.module.scss";

interface moduleProps {
  str: string;
  type: 0 | 1 | 2 | 3; //暂未公开 , now , 已结束
  size: "large" | "small";
  color: "white" | "yellow";

  className?: string;
}

type StateType = {
  [propsName: string]: any;
};

interface FontChart {
  props: moduleProps;
  state: StateType;
}

function splitStr(str: string): Array<string> {
  //去除所有空格
  const arr = str.replace(/\s/g, "").split("");
  const returrn = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    const str = replaceStr(el);
    returrn.push(str);
  }
  function replaceStr(str: string) {
    //将 . 替换成 dot
    const s1 = str.replace(".", "dot");
    //将 ~ 替换成 line
    const s2 = s1.replace("~", "line");
    //将 : 替换成 colon
    const s3 = s2.replace(":", "colon");
    return s3;
  }
  return returrn;
}

function isNum(str: string) {
  const Rex = /[0-9]/gi;
  const n = Rex.test(str);
  return n;
}

class FontChart extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    str: "0.0~0.0",
    type: 0,
    size: "large",
    color: "yellow",
  };

  state: StateType = {};

  render() {
    const { str, size, className, type, color } = this.props;

    const strArr = splitStr(str);
    return (
      <div className={`${styles.wrapper} ${styles[size]} ${className}`}>
        <div className={styles.fontBox}>
          {strArr.map((item: string, index: number) => {
            if (isNum(item)) {
              return outPutNumber(item, color, index);
            } else {
              return outPutchart(item, color, index);
            }
          })}
        </div>
        {type > 0 && (
          <div className={styles.statusBox}>
            {type === 1 && (
              <img
                src={require("./img/not_start.svg").default}
                alt=""
                className={styles.notStart}
              />
            )}
            {type === 2 && (
              <img
                src={require("./img/now.svg").default}
                alt=""
                className={styles.now}
              />
            )}
            {type === 3 && (
              <img
                src={require("./img/end.svg").default}
                alt=""
                className={styles.end}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
export default FontChart;

function outPutchart(str: string, color: string, index: number) {
  return (
    <div className={styles[`${str}box`]} key={index}>
      <div className={styles.fontImg}>
        <img src={require(`./number/${color}/${str}.png`).default} alt="" />
      </div>
    </div>
  );
}

function outPutNumber(str: string, color: string, index: number) {
  return (
    <div className={`${styles.numBox} ${styles[`num_${str}`]}`} key={index}>
      <div className={styles.fontImg}>
        <img src={require(`./number/${color}/${str}.png`).default} alt="" />
      </div>
    </div>
  );
}
