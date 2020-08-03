import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { withRouter } from "react-router-dom";
import { pureData } from "@/utils/utils";
import { getImgColor } from "@/utils/catchColor";

interface moduleProps {
  list: Array<any>;
  [propsName: string]: any;
}

type StateType = {
  list: any;
  [propsName: string]: any;
};
interface Module {
  props: moduleProps;
  state: StateType;
}

class Module extends React.Component<any> {
  static defaultProps: moduleProps = {
    list: [],
  };

  state: StateType = {
    list: [],
  };

  UNSAFE_componentWillMount() {
    this.setList();
  }

  setList = async () => {
    const { list } = this.props;
    const filterList: any = await this.filterArr(list);
    this.setState({
      list: filterList,
    });
  };

  filterArr = (arr: any) => {
    const _this = this;
    const list = pureData(arr);
    let count = 0;
    const maxCount = list.length;
    return new Promise((resolve, reject) => {
      list.forEach(async (el: any, index: number) => {
        const detailArr = await _this.setBgeColor(el.toyList);
        count += 1;
        list[index].toyList = detailArr;
        if (count >= maxCount) {
          resolve(list);
        }
      });
    });
  };

  setBgeColor = (arr: Array<any>) => {
    const list = pureData(arr);
    let count = 0;
    const maxCount = list.length;
    const bgColorArr: Array<any> = pureData(list);

    return new Promise((resolve, reject) => {
      list.forEach(async (el: any, index: number) => {
        const color: any = await getImgColor(el.thumb);
        count += 1;
        bgColorArr[index].bgColor = color;
        if (count >= maxCount) {
          resolve(bgColorArr);
        }
      });
    });
  };

  toyList_view = (toyList: Array<any>) => {
    return toyList.map((item: any, index: number) => {
      return (
        <div className={styles.toyItem} key={index}>
          <div
            className={styles.cover}
            style={{
              backgroundImage: `url(${item.thumb})`,
              backgroundColor: item.bgColor,
              borderColor: item.bgColor,
            }}
          ></div>
          <div className={styles.desc}>{item.title}&nbsp;</div>
          <div className={styles.info}>{item.info}&nbsp;</div>
        </div>
      );
    });
  };

  render() {
    const { list } = this.state;

    return (
      <div className={styles.wrapper}>
        {list.map((item: any, index: any) => {
          return (
            <div className={styles.toyYearList} key={index}>
              <div className={styles.yearTitle}>{item.time}年度</div>
              <div className={styles.screenBox}>
                {this.toyList_view(item.toyList)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default withRouter(Module);
