import React from "react";
import Avatar from "@/components/Avatar";
import { withRouter } from "react-router-dom";

import styles from "./index.module.scss";

interface moduleProps {
  data: {
    [propsName: string]: any;
  };
  className?: string;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Address {
  props: moduleProps;
  state: StateType;
}

class Address extends React.Component<any> {
  linkLocalPage = (e: any) => {
    e.stopPropagation(); //阻止冒泡

    const { data } = this.props;
    const { history } = this.props;
    if (data.locationId) {
      history.push(`/local?locationId=${String(data.locationId)}`);
    }
  };

  render() {
    const { data, className } = this.props;

    return (
      <>
        {data.locationTitle && (
          <div
            className={`${styles.originalLocation} ${className}`}
            onClick={this.linkLocalPage}
          >
            <img
              className={styles.localIcon2}
              src={require("./img/loca_licon.svg").default}
              alt=""
            />
            {data.locationTitle}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Address);
