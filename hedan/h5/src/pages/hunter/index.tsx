import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import {axios} from "@/utils/http";

type StateType = {
  [propsName: string]: any;
};

class Page extends React.Component {
  state: StateType = {
    rich: "",
  };

  componentDidMount() {
    axios({
      url: "/api/document/toysHunter",
      method: "get",
    }).then((res: any) => {
      this.setState({
        rich: res.data.data.content,
      });
    });
  }

  render() {
    const {rich} = this.state;

    return (
      <div className={styles.wrapper}>
        <div
          className={`${styles.contentBox}`}
          dangerouslySetInnerHTML={{
            __html: rich,
          }}
        />
      </div>
    );
  }
}
export default Page;
