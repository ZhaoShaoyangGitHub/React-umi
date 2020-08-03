import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";

interface moduleProps {
  data: {
    [propsName: string]: any;
  };
  [propsName: string]: any;
}

type StateType = {
  data: {
    [propsName: string]: any;
  };
};

interface Module {
  props: moduleProps;
  state: StateType;
}

function filterValue(str: string, str2?: string, str3?: string) {
  if (str) {
    return str;
  } else {
    return "-";
  }
}

function timeFilter(date: any) {
  const year = date.birthYear;
  const month = date.birthMonth;
  const day = date.birthDay;
  let str = "";
  if (year) {
    str += year;
  }
  if (month) {
    str += `.${month}`;
  }
  if (day) {
    str += `.${day}`;
  }
  return str;
}

class Module extends React.Component<moduleProps> {
  state: StateType = {
    data: {},
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>「DAN」生录</div>
        <div className={styles.table}>
          <div className={styles.tr}>
            <div className={styles.td}>
              <div className={styles.lable}>原型</div>
              <div className={styles.value}>{filterValue(data.prototype)}</div>
            </div>
            <div className={styles.td}>
              <div className={styles.lable}>制造</div>
              <div className={styles.value}>
                {filterValue(data.manufacturer)}
              </div>
            </div>
            <div className={styles.td}>
              <div className={styles.lable}>涂装</div>
              <div className={styles.value}>{filterValue(data.coating)}</div>
            </div>
          </div>
          <div className={styles.tr}>
            <div className={styles.td}>
              <div className={styles.lable}>尺寸</div>
              <div className={`${styles.value}`}>{filterValue(data.size)}</div>
            </div>
            <div className={styles.td}>
              <div className={styles.lable}>主要材料</div>
              <div className={`${styles.value}`}>
                {filterValue(data.material)}
              </div>
            </div>
            <div className={styles.td}>
              <div className={styles.lable}>数量</div>
              <div className={styles.value}>{filterValue(data.inventory)}</div>
            </div>
          </div>
          <div className={styles.tr}>
            <div className={styles.td}>
              <div className={styles.lable}>DAN生地</div>
              <div className={styles.value}>{filterValue(data.birthPlace)}</div>
            </div>
            <div className={styles.td}>
              <div className={styles.lable}>DAN生日</div>
              <div className={styles.value}>
                {filterValue(timeFilter(data))}
              </div>
            </div>
            <div className={styles.td}>
              <div className={styles.lable}>售价</div>
              <div className={styles.value}>{filterValue(data.info)}</div>
            </div>
          </div>
        </div>
        <pre className={styles.info}>{data.introduction}</pre>
      </div>
    );
  }
}

export default Module;
