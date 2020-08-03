import { observable, action, computed } from "mobx";
import { APPSTORE_LINK, ANDROID_LINK } from "@/config/constants";

class IndexStore {
  @observable type: string = "";

  @observable activeIndex: number = 0;

  @observable androidUrl: string = "ANDROID_LINK";

  @observable iosUrl: string = "APPSTORE_LINK";

  constructor() {
    this.type = "";
  }

  @action
  downLoadApp = (type: string) => {
    this.type = type;
  };

  close = () => {
    this.type = "";
  };

  updateSwiperActiveIndex = (index: number) => {
    this.activeIndex = index;
  };
}

const indexStore = new IndexStore(); //通过new 创建一个homeStore对象实例通过export导出

export default indexStore;
