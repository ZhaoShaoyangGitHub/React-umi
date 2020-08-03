import {ACTIVITYCODE} from "../active_config";

export const progressNode = () => {
  /*
     一期 :
     dynamic:  1  7  15
     share:  1  3  7

     二期:
     dynamic:  1  5  9
     share:  1  3  5
    */

  let dynamic_1 = 1;
  let dynamic_2 = 7;
  let dynamic_3 = 15;

  let share_1 = 1;
  let share_2 = 3;
  let share_3 = 7;
  if (ACTIVITYCODE.indexOf("-1") > -1) {
    // 一期
  } else {
    // 其它期
    dynamic_1 = 1;
    dynamic_2 = 5;
    dynamic_3 = 9;

    share_1 = 1;
    share_2 = 3;
    share_3 = 5;
  }

  // if (ACTIVITYCODE.indexOf("-2") > -1) {
  // }

  return {
    dynamic_1,
    dynamic_2,
    dynamic_3,
    share_1,
    share_2,
    share_3,
  };
};

export const countProgress = (dynamic: number, share: number) => {
  // console.log("item", item);
  // console.log("status", status);

  // dynamic = 15;
  // share = 15;

  const progress = progressNode();
  let dynamicNum = dynamic;
  let shareNum = share;
  let type = 0;

  // 在这里先要判断资格在哪一个层次

  /*
    层次0
    动态大于等于 dynamic_1 且 分享大于等于  share_1
    啥也木有

    层次1
    动态大于等于 dynamic_2 且 分享大于等于  share_2
    得到了图标

    层次2
    动态大于等于 dynamic_3 且 分享大于等于  share_3
    得到了玩具柜皮肤

    层次3
    动态大于等于 dynamic_3 且 分享大于等于  share_3
    得到了抽奖权
  */

  //目标 - 当前 ，其中一个 大于零说明没到达 ，小于等于零说明达到
  const lv_1_d = progress.dynamic_1 - dynamic;
  const lv_1_s = progress.share_1 - share;

  const lv_2_d = progress.dynamic_2 - dynamic;
  const lv_2_s = progress.share_2 - share;

  const lv_3_d = progress.dynamic_3 - dynamic;
  const lv_3_s = progress.share_3 - share;

  if (lv_1_d > 0 || lv_1_s > 0) {
    // console.log("层级一，啥也没有，目标是图标", lv_1_d, lv_1_s);
    dynamicNum = lv_1_d;
    shareNum = lv_1_s;
    type = 0;
  } else if (lv_2_d > 0 || lv_2_s > 0) {
    // console.log("层级二，有了个图标，目标是玩具柜", lv_2_d, lv_2_s);
    dynamicNum = lv_2_d;
    shareNum = lv_2_s;
    type = 1;
  } else if (lv_3_d > 0 || lv_3_s > 0) {
    // console.log("层级三，有了个玩具柜，目标是抽奖权", lv_3_d, lv_3_s);
    dynamicNum = lv_3_d;
    shareNum = lv_3_s;
    type = 2;
  }

  if (lv_3_d <= 0 && lv_3_s <= 0) {
    // console.log("层级四，恭喜获得抽奖权", lv_3_d, lv_3_s);
    dynamicNum = 0;
    shareNum = 0;
    type = 3;
  }

  return {
    shareNum,
    dynamicNum,
    type,
  };
};

export const progressFilter = (type: number | string) => {
  let str = "";
  switch (Number(type)) {
    case 0:
      str = "限定主题应用图标";
      break;
    case 1:
      str = "限定主题玩具柜皮肤";
      break;
    case 2:
      str = "优先购买抽选权";
      break;
    default:
      str = "";
      break;
  }

  return str;
};
