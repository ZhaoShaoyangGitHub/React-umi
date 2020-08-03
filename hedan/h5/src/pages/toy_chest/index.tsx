import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { getUrlParam } from "@/utils/utils";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import { getSkin, getList } from "./api";
import OpenAppFooter from "@/components/OpenAppFooter";

import { getUserDetail } from "@/pages/user/api";
import NullPage from "@/components/NullPage";

import LineBox111 from "./moudle/LineBox111";
import LineBox3 from "./moudle/LineBox3";
import LineBox12 from "./moudle/LineBox12";
import LineBox21 from "./moudle/LineBox21";
import { formatList } from "./datafilter";
interface ComponentsProps extends props {
  [propsName: string]: any;
}

type StateType = {
  userId: string;
  skin: {
    [propsName: string]: any;
  };
  detail: any;
  list: any;
  brandCount: Number;
  toyCount: Number;
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}

class Page extends React.Component<ComponentsProps> {
  state: StateType = {
    userId: "",
    brandCount: 0,
    toyCount: 0,
    skin: {
      twoImage: "http://file.hedan.art/Fu7BFEFxEnJVPSOtJ98D7qsm7Vkj",
      oneImage: "http://file.hedan.art/FuEuo89T-vqwzVrqAA5aeApAHQpf",
      thumb: "http://file.hedan.art/FqgcFvw88ANH4bkU48TdbcYZd1tz",
      backgroundImage: "http://file.hedan.art/FpK6LbeRe1c6Z3gNGtNmPdecbaAz",
      addImage: "http://file.hedan.art/FrvRJBFGTQ5OrilD_Url3XI9LPN_",
      headImage: "http://file.hedan.art/Frw6XJ_ZMnPJv7rQuMATE_YPS7ou",
      frameImage: "http://file.hedan.art/FqDTasTJ6MzsTljYHFtiBxGAo_SK",
      bottomImage: "http://file.hedan.art/FhJBV2f5L7Q6DYRBBrLN1sei1Tgm",
      skinId: "1226782892261146625",
      title: "圆乃-普通",
      threeImage: "http://file.hedan.art/FuMkbnBZirl0uKeycb3b9ugbfgRe",
      fontColor: "#ffffff",
    },
    detail: {},
    list: [],
  };

  UNSAFE_componentWillMount() {
    let { userId } = getUrlParam();
    const { test } = getUrlParam();
    if (userId) {
      //
    } else {
      if (test) {
        userId = "1229333854918021122";
        // userId = "5";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 userId");
      }
    }

    this.setState(
      {
        userId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const { userId } = this.state;
    getUserDetail({
      customerId: userId,
    }).then((res: any) => {
      if (res.data) {
        this.setState({
          detail: res.data,
        });
      } else {
        this.setState({
          userId: "",
        });
      }
    });
    getList({ customerId: userId }).then((res: any) => {
      if (res.data && res.data.list.length) {
        const { list, brandCount, toyCount } = res.data;
        this.setState({
          list: formatList(list),
          brandCount,
          toyCount,
        });
      }
    });
    getSkin({ customerId: userId }).then((res: any) => {
      if (res.data) {
        this.setState({
          skin: res.data,
        });
      }
    });
  };

  linkUser = () => {
    const { skin, detail, list } = this.state;
    this.props.history.push(`/user?userId=${detail.userId}`);
  };

  render() {
    const { skin, detail, list, brandCount, toyCount, userId } = this.state;

    if (detail.nickname) {
      document.title = `${detail.nickname}的玩具柜 - 盒DAN`;
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />
        {!userId && <NullPage />}

        <div className={styles.userDetail} onClick={this.linkUser}>
          <Avatar className={styles.userCover} url={detail.avatar} />
          <span className={styles.nickname}>{detail.nickname}</span>{" "}
          的盒DAN玩具柜
        </div>
        <div className={styles.contentBox}>
          <div className={styles.titleBox}>
            <div className={styles.titleStr}>玩具柜</div>
            <img
              className={styles.titleCover}
              src={require("./img/title.png").default}
              alt=""
            />
            <div className={styles.titleCont}>
              {brandCount}个品牌 {toyCount}个玩具
            </div>
          </div>
          <div className={styles.listBox}>
            {list.map((item: any, index: any) => {
              if (item.type === "12") {
                return <LineBox12 data={item.list} key={index} />;
              } else if (item.type === "21") {
                return <LineBox21 data={item.list} key={index} />;
              } else if (item.type === "3") {
                return <LineBox3 data={item.list} key={index} />;
              } else {
                return <LineBox111 data={item.list} key={index} />;
              }
            })}
          </div>
        </div>
        {/* */}

        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP一起来玩玩具柜吧~
        </OpenApp>
        {list > 6 && <OpenAppFooter />}
      </div>
    );
  }
}
export default Page;
