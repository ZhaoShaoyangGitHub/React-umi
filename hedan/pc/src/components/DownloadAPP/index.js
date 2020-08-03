import React from "react";

import styles from "./index.module.scss";

class DownloadAPP extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <span className="logo"></span>
        <div className="desc">
          <div className="img"></div>
          <div className="app-desc"></div>
        </div>
        <span className={styles.download}>下载APP</span>
      </div>
    );
  }
}

export default DownloadAPP;
