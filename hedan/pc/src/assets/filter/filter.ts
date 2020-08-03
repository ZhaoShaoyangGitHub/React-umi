export const sellType = (type: Number) => {
  let str = "";
  switch (Number(type)) {
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
  return str;
};

export const xxxx = () => {};
