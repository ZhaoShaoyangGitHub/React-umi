import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import {getUrlParam} from "@/utils/utils";
import {getDetail, getMomentList} from "./api";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import MapBg from "@/components/MapBg";
import TopicList from "@/components/TopicList";
import {provinceFilter} from "@/assets/filter/filter";
import NullPage from "@/components/NullPage";
import OpenAppFooter from "@/components/OpenAppFooter";

interface ComponentsProps extends props {
  name: string;
}

type StateType = {
  locationId: string;
  detail: any;
  list: any[];
  isOpen: boolean;
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}

class Page extends React.Component<ComponentsProps> {
  state: StateType = {
    locationId: "",
    detail: {},
    list: [],
    isOpen: false,
  };

  UNSAFE_componentWillMount() {
    let {locationId} = getUrlParam();

    const {test} = getUrlParam();
    if (locationId) {
      //
    } else {
      if (test) {
        locationId = "1195243859798396930";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 locationId");
      }
    }

    this.setState(
      {
        locationId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const {locationId} = this.state;
    getDetail({
      locationId,
    }).then((res: any) => {
      if (res.data) {
        this.setState({
          detail: res.data,
        });
      } else {
        this.setState({
          locationId: "",
        });
      }
    });
    getMomentList({
      locationId,
      tab: 2,
      pageSize: 20,
      pageIndex: 1,
    }).then((res) => {
      this.setState({
        list: res.data.list,
      });
    });
  };

  showNav = () => {
    const {detail} = this.state;
    this.setState({isOpen: !this.state.isOpen});
  };

  Link_view = () => {
    return " asdasdasdfasdfsa";
  };

  render() {
    const {detail, list, isOpen, locationId} = this.state;
    if (detail.title) {
      document.title = `${provinceFilter(detail.province)}·${
        detail.title
      } - 盒DAN`;
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />
        {!locationId && <NullPage />}

        <div className={styles.mapBg} onClick={this.showNav}>
          {detail.title && <MapBg data={detail} type={2} />}
        </div>

        <div className={styles.listBox}>
          <div className={styles.originalTitle}>
            <span className={styles.originalTitle_item}>热门</span>
          </div>

          {list.length ? <TopicList list={list} /> : ""}
        </div>

        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP看看更多有爱玩具动态吧
        </OpenApp>
        <OpenAppFooter />

        {isOpen ? (
          <div className={styles.DrawerBox}>
            <div className={styles.bg}></div>
            <div className={styles.contBox}>
              <a
                href={`http://uri.amap.com/marker?position=${detail.longitude},${detail.latitude}&name=${detail.title}&callnative=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.d_item}
              >
                高德地图
              </a>
              <a
                href={`https://apis.map.qq.com/uri/v1/search?keyword=${detail.title}&region=${detail.province}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.d_item}
              >
                腾讯地图
              </a>
              <a
                href={`http://api.map.baidu.com/geocoder?address=${detail.province}${detail.city}${detail.district}${detail.address}${detail.title}&output=html&src=webapp.baidu.openAPIdemo`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.d_item}
              >
                百度地图
              </a>
              <div
                className={`${styles.d_item} ${styles.cancel}`}
                onClick={this.showNav}
              >
                取消
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Page;
