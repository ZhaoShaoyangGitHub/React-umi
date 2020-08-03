import React from "react";
import Avatar from "@/components/Avatar";
import "./index.scss";
import { checkImg } from "@/utils/img";
interface moduleProps {
  list: string[];
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};
interface Module {
  props: moduleProps;
  state: StateType;
}

const win: any = window;

const Swiper = win.Swiper as any;

class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    list: [],
  };

  state: StateType = {};

  componentDidMount() {
    this.initSwiper();
  }

  mySwiper: any;

  UNSAFE_componentWillMount() {
    const { list } = this.props;
    this.setState({
      list,
    });
  }

  initSwiper = () => {
    const _this = this;
    _this.mySwiper = new Swiper(".dynamic-container", {
      slidesPerView: "auto",
      freeMode: true,
      pagination: {
        el: ".dynamic-pagination",
        clickable: true,
        renderBullet(index: any, className: any) {
          return `<div class="${className}"></div>`;
        },
      },
    });
  };

  checkImg = (url: string) => {
    checkImg(url);
  };

  render() {
    const { list } = this.state;

    return (
      <div className="dynamic-swiper">
        <div className="swiper-container dynamic-container">
          <div className="swiper-wrapper">
            {list.map((item: string, index: number) => {
              return (
                <div key={index} className="swiper-slide dynamic-silder">
                  <div
                    className="dynamic-cover"
                    style={{
                      backgroundImage: `url(${item})`,
                    }}
                    onClick={() => {
                      this.checkImg(item);
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        {list.length > 1 && <div className="dynamic-pagination"></div>}
      </div>
    );
  }
}
export default Module;
