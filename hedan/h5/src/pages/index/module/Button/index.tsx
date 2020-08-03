import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

interface moduleProps {
  className?: any;
  [propsName: string]: any;
}

interface Module {}
class Module extends React.Component<moduleProps> {
  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  render() {
    const { className, ...other } = this.props;
    return (
      <div className={`${styles.wrapper} ${className}`} {...other}>
        {this.props.children}
      </div>
    );
  }
}
export default Module;
