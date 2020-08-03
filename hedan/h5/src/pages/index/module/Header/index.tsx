import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

interface moduleProps {
  status: boolean;
  onChange: Function;
  color: "white" | "vi";
}

interface Header {}
class Header extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    status: false,
    color: "white",
    onChange: () => {},
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  logo_view = () => {
    const { color } = this.props;
    let imgType = "";

    switch (color) {
      case "white":
        imgType = "-white";
        break;
      case "vi":
        imgType = "";
        break;
      default:
        imgType = "";
        break;
    }
    return (
      <img
        className={styles.logo}
        src={require(`@/assets/image/header-logo${imgType}.png`).default}
        alt="logo"
      />
    );
  };

  render() {
    const { status, color } = this.props;
    return (
      <div className={styles.wrapper}>
        {this.logo_view()}
        <div
          className={`${styles.btn} ${status && styles.active} ${
            styles[color]
          }`}
          onClick={() => {
            this.props.onChange();
          }}
        >
          <i className={styles.top}></i>
          <i className={styles.bottom}></i>
        </div>
      </div>
    );
  }
}
export default Header;

/*


*/
