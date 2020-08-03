import React from "react";
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

interface AuthIcon {
  props: moduleProps;
  state: StateType;
}

class AuthIcon extends React.Component<any> {
  render() {
    const { data, className } = this.props;
    let leve = 0;
    if (data.isAuthentication) {
      leve = 1;
    }
    if (data.isBlueAuth) {
      leve = 2;
    }

    return (
      <>
        {leve > 0 ? (
          <div className={`${styles.authIcon} ${className}`}>
            {leve === 1 ? (
              <img src={require("./img/dan.svg").default} alt="" />
            ) : (
              <img src={require("./img/dan-blue.svg").default} alt="" />
            )}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(AuthIcon);
