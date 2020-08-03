export const sellType = (data: any) => {
  const type = data.type;

  let str = "";

  if (type - 2 === 0) {
    str = "展会";
  }
  if (type - 3 === 0) {
    str = "二手";
  }
  if (type - 1 === 0) {
    const sell_type = data.sellType;

    switch (Number(sell_type)) {
      case 1:
        str = "抽选";
        break;
      case 2:
        str = "限量";
        break;
      case 3:
        str = "限时";
        break;
      case 4:
        str = "通贩";
        break;
      case 5:
        str = "众筹";
        break;
      case 6:
        str = "预售";
        break;
      case 7:
        str = "抽奖";
        break;
      case 8:
        str = "集赞";
        break;

      default:
        break;
    }
  }

  return str;
};
export const xxx = () => {};

export const provinceFilter = (province: string): string => {
  if (province) {
    return province.replace("市", "");
  } else {
    return "";
  }
};

export const roleType = (type: Number) => {
  let str = "";
  switch (Number(type)) {
    case 1:
      str = "玩具设计师";
      break;
    case 2:
      str = "主理人";
      break;
    case 3:
      str = "代理人";
      break;
    case 4:
      str = "小助手";
      break;
    case 5:
      str = "主理人兼玩具设计师";
      break;
    case 6:
      str = "品牌官方号";
      break;
    case 7:
      str = "运营";
      break;
    case 8:
      str = "涂装";
      break;
    default:
      str = "";
      break;
  }
  return str;
};
