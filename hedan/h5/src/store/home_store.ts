import { observable, action, computed } from "mobx";

class HomeStore {
  @observable text: any;

  @observable num: any;

  constructor() {
    this.num = 0;
    this.text = "Hello Word!";
  }

  @action
  plus = () => {
    this.num += 1;
  };

  minus = () => {
    this.num -= 1;
  };

  change = (str: any) => {
    this.text = str;
  };

  @computed
  get plusNum() {
    return this.num + 5;
  }
}

const homeStore = new HomeStore(); //通过new 创建一个homeStore对象实例通过export导出

export default homeStore;
