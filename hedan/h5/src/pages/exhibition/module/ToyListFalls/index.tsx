import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { fallsData } from "./filterData";
import { withRouter } from "react-router-dom";
import OpenApp from "@/components/OpenApp";

interface moduleProps {
  list: Array<any>;
  [propsName: string]: any;
}

type StateType = {
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

  state: StateType = {};

  UNSAFE_componentWillMount() {
    const { list } = this.props;
    this.setState({
      list,
    });
  }

  linkSource = (item: any) => {
    window.location.href = item.link;
    // this.props.history.push(`/source?robotId=${item.id}`);
  };

  item_view = (item: any, index: any) => {
    return (
      <div
        key={index}
        className={styles.item}
        onClick={() => {
          this.linkSource(item);
        }}
      >
        <div
          style={{
            backgroundImage: `url(${item.thumb})`,
          }}
          className={styles.cover}
        >
          <div className={styles.typeLabel}>
            {item.position && (
              <div className={styles.limticon}>{item.position}</div>
            )}
            {item.isLimit ? <div className={styles.newIcon}>限定玩具</div> : ""}
          </div>
          <OpenApp className={styles.more}>
            <img src={require("@/assets/image/more.svg").default} alt="" />
          </OpenApp>
        </div>
        <div className={styles.info}>
          {item.description}&nbsp;&nbsp;
          <span className={styles.blue}>
            来源
            {item.source}
            {item.shortLink ? (
              <img
                className={styles.linkIcon}
                src={require("@/assets/image/linkicon.svg").default}
                alt=""
              />
            ) : (
              ""
            )}
            <span className={styles.blue}>{item.shortLink}</span>
          </span>
        </div>
      </div>
    );
  };

  render() {
    const { list } = this.state;
    const leftList = fallsData(list).left;
    const rightList = fallsData(list).right;

    return (
      <div className={styles.wrapper}>
        <div className={styles.leftList}>
          {leftList.map((item: any, index: number) => {
            return this.item_view(item, index);
          })}
        </div>
        <div className={styles.rightList}>
          {rightList.map((item: any, index: number) => {
            return this.item_view(item, index);
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(Module);
