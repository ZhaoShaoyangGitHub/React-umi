import React from "react";
import styles from "./index.module.scss";
import {progressNode, countProgress} from "../../filter";
interface moduleProps {
  dynamic: number;
  share: number;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface ActivityHeader {
  props: moduleProps;
  state: StateType;
}

class ActivityHeader extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    dynamic: 0,
    share: 0,
  };

  state: StateType = {
    dynamicArr: [],
    shareArr: [],
  };

  componentDidMount() {
    this.initRangeView();
  }

  initRangeView = () => {
    const {
      dynamic_1,
      dynamic_2,
      dynamic_3,
      share_1,
      share_2,
      share_3,
    } = progressNode();

    const dynamicArr = [];

    for (let i = 0; i < dynamic_3 + 1; i++) {
      if (i + 1 === dynamic_1) {
        dynamicArr.push(1);
      } else if (i + 1 === dynamic_2) {
        dynamicArr.push(2);
      } else if (i === dynamic_3) {
        dynamicArr.push(3);
      } else {
        dynamicArr.push(0);
      }
    }
    const shareArr = [];

    for (let i = 0; i < share_3 + 1; i++) {
      if (i + 1 === share_1) {
        shareArr.push(1);
      } else if (i + 1 === share_2) {
        shareArr.push(2);
      } else if (i === share_3) {
        shareArr.push(3);
      } else {
        shareArr.push(0);
      }
    }

    this.setState({
      shareArr,
      dynamicArr,
    });
  };

  render() {
    // eslint-disable-next-line prefer-const
    let {className, dynamic, share} = this.props;
    const {dynamicArr, shareArr} = this.state;
    const {type} = countProgress(dynamic, share);

    return (
      <div className={`${styles.wrapper} ${className}`}>
        <div className={styles.title}>
          活动期间累计发布动态 <span>{dynamic}</span>/{dynamicArr.length - 1}
        </div>

        <RangeBox list={dynamicArr} now={dynamic} type={type} />

        <div className={styles.title}>
          活动期间成功分享动态 <span>{share}</span>/{shareArr.length - 1}
        </div>

        <RangeBox list={shareArr} now={share} type={type} />
      </div>
    );
  }
}
export default ActivityHeader;

function RangeBox({
  list,
  now,
  type,
}: {
  list: Array<number>;
  now: number;
  type: number;
}) {
  return (
    <div className={styles.rangeBox}>
      {list.map((item, index) => {
        // 判断是否需要蓝色
        let isBlue = false;
        if (now > index) {
          isBlue = true;
        }
        if (now === list.length - 1) {
          isBlue = true;
        }

        // 判断是否是最后一格进度
        let isLast = false;
        if (now !== list.length - 1) {
          if (now - 1 === index) {
            isLast = true;
          }
        }

        return (
          <div
            key={index}
            data-type={type}
            className={`${styles.block} ${isBlue && styles.blue} ${
              isLast && styles.blueLast
            }`}
          >
            {item === 1 && (
              <img
                className={styles.rangIcon}
                src={
                  require(`./img/icon_${type >= 1 ? "color" : "gray"}.png`)
                    .default
                }
                alt=""
              />
            )}

            {item === 2 && (
              <img
                className={styles.rangIcon}
                src={
                  require(`./img/toy_${type >= 2 ? "color" : "gray"}.png`)
                    .default
                }
                alt=""
              />
            )}

            {item === 3 && (
              <img
                className={styles.rangIcon}
                src={
                  require(`./img/end_${type >= 3 ? "color" : "gray"}.png`)
                    .default
                }
                alt=""
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
