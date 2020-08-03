import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

import {getDetail} from "./api";
import {getUrlParam} from "@/utils/utils";

type StateType = {
  title: string;
  content: string;
};

class Page extends React.Component {
  state: StateType = {
    title: "",
    content: "",
  };

  componentDidMount() {
    const {id} = getUrlParam();
    if (id) {
      getDetail({id}).then((res: any) => {
        const {title, content} = res.data;
        this.setState({
          title,
          content,
        });
      });
    } else {
      // eslint-disable-next-line no-alert
      window.alert("缺少id");
    }
  }

  render() {
    const {title, content} = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div
          className={styles.detail}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    );
  }
}
export default Page;
