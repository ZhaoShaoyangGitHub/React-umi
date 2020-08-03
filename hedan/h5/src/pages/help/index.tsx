import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

import {getList} from "./api";

import {Accordion, List, Button} from "antd-mobile";

type StateType = {
  [propsName: string]: any;
};

class Page extends React.Component<props> {
  state: StateType = {
    list: [],
  };

  componentDidMount() {
    getList().then((res) => {
      this.setState({
        list: res.data,
      });
    });
  }

  onChange = (key: any) => {
    // console.log(key);
  };

  goToDetail = (item: any) => {
    const {id} = item;
    this.props.history.push(`/help_detail?id=${id}`);
  };

  render() {
    const {list} = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>你在什么地方遇到问题啦?</div>
        <Accordion
          defaultActiveKey=""
          className="my-accordion"
          onChange={this.onChange}
        >
          {list.length &&
            list.map((item: any, index: any) => {
              return (
                <Accordion.Panel header={item.title} key={index}>
                  <List className="my-list">
                    {item.helpList.map((help: any, help_index: any) => {
                      return (
                        <List.Item
                          wrap={true}
                          arrow="horizontal"
                          key={help_index}
                          onClick={() => {
                            this.goToDetail(help);
                          }}
                        >
                          {help.title}
                        </List.Item>
                      );
                    })}
                  </List>
                </Accordion.Panel>
              );
            })}
        </Accordion>

        <div className={styles.footer}>
          <Button
            type="primary"
            className={styles.button}
            onClick={() => {
              this.props.history.push("/help_submit");
            }}
          >
            意见反馈
          </Button>
        </div>
      </div>
    );
  }
}
export default Page;
