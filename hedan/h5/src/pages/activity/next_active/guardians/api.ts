import {pureData} from "@/utils/utils";

const structure = {
  bg: "bg.jpg",
  cover: "cover.jpg",
  icon: "icon.png",
  logo: "logo.png",
  badge: "badge.png",
  contter_cont: "center_cont.png",
  logo_x: "logo_x.png",
  phone: "phone.png",
};

// 当前的活动 , 永远只有一组
const dataModule = [
  {
    id: 17,
    logoH: 20,
    name: "zaiyiART",
    ...structure,
    reName: "在一",
    title: "在一ART",
    contter_cont: "",
    award:
      "一年内新品（含OFF款）优先购买权一次*5（王拖沓仅限树脂款） 的抽选资格",
    documentTitle: "在一",
    desc:
      "最高奖励: <b>在一ART“一年内玩具优先购买权*5（含OFF款）（王拖沓仅限树脂款）”</b>",
    //抽奖奖品文案
    prize: "一年内玩具优先购买权一次（含OFF款）（王拖沓仅限树脂款） 抽选资格",
    taskAddTxt: "的玩具<b>（桃桃墩、何丧丧）</b>",
    taskReleaseTxt: "<b>（桃桃墩、何丧丧、王拖沓）</b>",
    progressTxt:
      "在一ART一年内含OFF款玩具优先购买权一次（王拖沓仅限树脂款） 的抽选资格",
  },
  {
    id: 18,
    logoH: 20,
    name: "MTStudio",
    ...structure,
    reName: "KOKO",
    title: "MTStudio",
    contter_cont: "",
    award: "一年内新品（非OFF款）优先购买权一次*5 的抽选资格",
    documentTitle: "",
    desc: "最高奖励: <b>MTStudio“一年内玩具优先购买权*5（非OFF款）”</b>",
    //抽奖奖品文案
    prize: "一年内新品优先购买权一次（非off款） 的抽选资格",
    taskAddTxt: "任一玩具",
    taskReleaseTxt: "",
    progressTxt: "MTStudio一年内非OFF款玩具优先购买权一次 的抽选资格",
  },
];

const getModuleData = (obj: any) => {
  const selectModule: any = {...obj};
  for (const key in selectModule) {
    if (selectModule.hasOwnProperty(key)) {
      const el = selectModule[key];
      const elStr = String(el);
      if (elStr.indexOf(".") > -1) {
        selectModule[
          key
        ] = require(`../guardians/img/data_img/${selectModule.name}/${elStr}`).default;
      }
    }
  }
  return selectModule;
};

export const getList = () => {
  const returnArr: any = [];
  dataModule.forEach((item) => {
    const activeObj: any = item;
    const retuObj: any = getModuleData(activeObj);
    returnArr.push(retuObj);
  });

  return pureData({
    list: returnArr,
    date: "8.6~9.3",
    type: 2, //   0 | 1 | 2 | 3 ;  无 , 暂未公开 , now , 已结束
  });
};

export const getDetail = (id: number) => {
  let selectModule: any = {};
  for (let i = 0; i < dataModule.length; i++) {
    const el = dataModule[i];
    if (el.id - id === 0) {
      selectModule = el;
      break;
    }
  }

  const returnModule = getModuleData(selectModule);

  return pureData({
    detail: returnModule,
    date: "8.6~9.3",
    type: 2,
  });
};

//已结束的活动 ， 存在多组
const dataModule_end = [
  {
    type: 3,
    date: "3.14~4.11",
    awardCover: "/static/active_1_cover.png",
    list: [
      {
        id: 1,
        logoH: 22,
        name: "sank",
        ...structure,
        reName: "SankToys",
        title: "SankToys",
        contter_cont: "",
        award: " 一年内新品非OFF款玩具优先购买抽奖权",
        documentTitle: "玩具守护者 - SankToys x 盒DAN",
        desc:
          "最高奖励: <b>SankToys“一年内新品非OFF款玩具优先购买抽选权（共5个获奖名额）”</b>",
        //抽奖奖品文案
        prize: "“一年内新品非OFF款玩具优先购买权”",
      },
      {
        id: 2,
        logoH: 16,
        name: "wild",
        ...structure,
        reName: "野宅",
        title: "野宅WILDPRO",
        award: " x 盒DAN特别涂装款5 OFF玩具抽奖权",
        documentTitle: "玩具守护者 - 野宅WildPro x 盒DAN",
        desc:
          "最高奖励: <b>野宅WILDPRO的“盒DAN特别涂装款玩具（共5个获奖名额）”</b>",
        //抽奖奖品文案
        prize: "“野宅WILDPRO x 盒DAN特别涂装款玩具购买权”",
      },
      {
        id: 3,
        logoH: 20,
        name: "stump",
        ...structure,
        reName: "树墩子",
        title: "树墩子STUMPWORKS",
        longBox: true,
        award: " x 盒DAN特别涂装款5 OFF玩具抽奖权",
        documentTitle: "玩具守护者 - STUMPWORKS x 盒DAN",
        desc:
          "最高奖励: <b>STUMPWORKS的“盒DAN特别涂装款玩具（共5个获奖名额）”</b>",
        //抽奖奖品文案
        prize: "“树墩子STUMPWORKS x 盒DAN特别涂装款玩具购买权”",
      },
      {
        id: 4,
        logoH: 20,
        name: "pdpum",
        ...structure,
        reName: "PDRUM",
        title: "PDRUM",
        award: " 心碎午夜款屁屁鼓优先购买抽选权",
        documentTitle: "玩具守护者 - PDRUM x 盒DAN",
        desc:
          "最高奖励: <b>PDRUM“午夜心碎款屁屁鼓优先购买抽选权（共5个获奖名额）”</b>",
        //抽奖奖品文案
        prize: "“PDRUM 心碎午夜款屁屁鼓优先购买权”",
      },
    ],
  },
  {
    type: 3,
    date: "4.12~5.10",
    awardCover: "/static/active_2_cover.png",
    list: [
      {
        id: 5,
        logoH: 22,
        name: "ky928",
        ...structure,
        reName: "KY928TOY",
        title: "KY928TOY",
        award: " X 盒DAN 5 OFF 特别涂装款 购买权 抽选资格",
        documentTitle: "玩具守护者 - KY928TOY x 盒DAN",
        desc: "最高奖励: <b>KY928TOY“面包小方 5 OFF 特别涂装款购买权”</b>",
        //抽奖奖品文案
        prize: "“KY928TOY x 盒DAN 5 OFF 特别涂装款:蛋仔方 购买权”",
      },
      {
        id: 6,
        logoH: 16,
        name: "pettimal",
        ...structure,
        reName: "圆乃",
        title: "Pettimal",
        award: " X 盒DAN 5OFF 特别涂装款：棉花糖大小冰 购买权 抽选资格",
        documentTitle: "玩具守护者 - pettimal x 盒DAN",
        desc: "最高奖励: <b>Pettimal“圆乃冰块 5 OFF 特别涂装款 购买权”</b>",
        //抽奖奖品文案
        prize: "“Pettimal x 盒DAN 5OFF 特别涂装款：棉花糖大小冰 购买权”",
      },
      {
        id: 7,
        logoH: 20,
        name: "red_capsule",
        ...structure,
        reName: "红胶囊",
        contter_cont: "",
        title: "红胶囊",
        longBox: true,
        award: "一年内新品优先购买权一次 抽选资格",
        documentTitle: "玩具守护者 - 红胶囊 x 盒DAN",
        desc: "最高奖励: <b>红胶囊“一年内新品优先购买权一次（共5名）”</b>",
        //抽奖奖品文案
        prize: "“红胶囊一年内新品优先购买权一次”",
      },
      {
        id: 8,
        logoH: 20,
        name: "mountain_studio",
        ...structure,
        reName: "MountainStudio",
        contter_cont: "",
        title: "MountainStudio",
        award: "一年内新品（非OFF款）优先购买权一次 抽选资格",
        documentTitle: "玩具守护者 - Mountain Studio x 盒DAN",
        desc:
          "最高奖励: <b>Mountain Studio“一年内新品（非OFF款）优先购买权一次（共5名）”</b>",
        //抽奖奖品文案
        prize: "“Mountain Studio一年内新品（非OFF款）优先购买权一次”",
      },
    ],
  },
  {
    type: 3,
    date: "5.11~6.8",
    awardCover: "/static/active_3_cover.png",
    list: [
      {
        id: 9,
        logoH: 20,
        name: "moster",
        ...structure,
        reName: "蒙特大师",
        title: "蒙特大师",
        award:
          "【盒DAN特别涂装款玩具】*3或【一年内非off款优先购买权一次】*2 的抽选资格",
        documentTitle: "玩具守护者 - 蒙特大师 x 盒DAN",
        desc:
          "最高奖励: <b>蒙特大师“盒DAN特别涂装款玩具*3+一年内玩具优先购买抽选权*2（非OFF款）”</b>",
        //抽奖奖品文案
        prize:
          "“1蒙特大师 X 盒DAN 3OFF 特别涂装款 购买权2蒙特大师一年内新品（非OFF款）优先购买权一次”",
      },
      {
        id: 10,
        logoH: 16,
        name: "huhu",
        ...structure,
        reName: "HUHU研究所",
        contter_cont: "",
        title: "HUHU研究所",
        award: "一年内新品（非OFF款）优先购买权一次 抽选资格",
        documentTitle: "玩具守护者 - HUHU x 盒DAN",
        desc:
          "最高奖励: <b>HUHU研究所“一年内玩具优先购买抽选权*5（非OFF款）”</b>",
        //抽奖奖品文案
        prize: "“HUHU一年内新品（非OFF款）优先购买权一次”",
      },
      {
        id: 11,
        logoH: 22,
        name: "chaos",
        ...structure,
        reName: "ChaosChaos",
        contter_cont: "",
        title: "ChaosChaos",
        award: "一年内新品（非OFF款）优先购买权一次 抽选资格",
        documentTitle: "玩具守护者 - KY928TOY x 盒DAN",
        desc:
          "最高奖励: <b>ChaosChaos “一年内玩具优先购买抽选权*5（非OFF款）”</b>",
        //抽奖奖品文案
        prize: "“ChaosChaos一年内新品（非OFF款）优先购买权一次”",
      },
      {
        id: 12,
        logoH: 20,
        name: "lovely",
        ...structure,
        reName: "LovelyEva",
        contter_cont: "",
        title: "LovelyEva",
        longBox: true,
        award: "一年内新品（含OFF款）优先购买权一次 抽选资格",
        documentTitle: "玩具守护者 - LovelyEva x 盒DAN",
        desc:
          "最高奖励: <b>LovelyEva “一年内玩具优先购买抽选权*5（含OFF款）”</b>",
        //抽奖奖品文案
        prize: "“LovelyEva一年内新品（含OFF款）优先购买权一次”",
      },
    ],
  },
  {
    type: 3,
    date: "6.9~7.7",
    awardCover: "/static/active_4_cover.png",
    list: [
      {
        id: 13,
        logoH: 20,
        name: "planetbear",
        ...structure,
        reName: "白熊百货商店",
        contter_cont: "",
        title: "白熊百货商店",
        award: "一年内新品（非OFF款）优先购买权一次+专属签绘",
        documentTitle: "玩具守护者 - 白熊百货商店 x 盒DAN",
        desc:
          "最高奖励: <b>白熊百货商店“一年内玩具优先购买权*5（赠送徽章）+专属签绘”</b>",
        //抽奖奖品文案
        prize: "白熊百货商店一年内新品（非OFF款）优先购买权一次+专属签绘",
      },
      {
        id: 14,
        logoH: 16,
        name: "Sean",
        ...structure,
        reName: "白日梦WORKSHOP",
        title: "白日梦WORKSHOP",
        award: " X 盒DAN 5OFF 特别涂装款CHICHI 购买权 的抽选资格",
        documentTitle: "玩具守护者 - 白日梦WORKSHOP x 盒DAN",
        desc: "最高奖励: <b>白日梦WORKSHOP“盒DAN特别涂装款CHICHI*5”</b>",
        //抽奖奖品文案
        prize: "“白日梦WORKSHOP X 盒DAN 5OFF 特别涂装款CHICHI 购买权”",
      },
      {
        id: 15,
        logoH: 22,
        name: "muzzy",
        ...structure,
        reName: "MUZZY",
        contter_cont: "",
        title: "MUZZY",
        award: "一年内新品（非OFF款）优先购买权一次 抽选资格",
        documentTitle: "玩具守护者 - MUZZY x 盒DAN",
        desc: "最高奖励: <b>MUZZY “一年内玩具优先购买权*5（非OFF款）”</b>",
        //抽奖奖品文案
        prize: "“MUZZY一年内新品（非OFF款）优先购买权一次”",
      },
    ],
  },
  {
    type: 4,
    date: "7.8~8.5",
    awardCover: "/static/active_5.cover.png",
    list: [
      {
        id: 16,
        logoH: 20,
        name: "woworks",
        ...structure,
        reName: "饼饼",
        title: "WOWORKS",
        award: "Little Buns 饼饼 Sitting Chef Ver 铲铲饼购买权 抽选资格",
        documentTitle: "玩具守护者 - 饼饼 x 盒DAN",
        desc:
          "最高奖励: <b>WOWORKS“Little Buns 饼饼 Sitting Chef Ver 铲铲饼购买权*50”</b>",
        //抽奖奖品文案
        prize: "“Little Buns 饼饼 Sitting Chef Ver 铲铲饼购买权”",
      },
    ],
  },
];

export const getList_end = () => {
  const returnArr: any = [];

  dataModule_end.forEach((item) => {
    const activeObj: any = pureData(item);
    activeObj.list.forEach((item2: any, index: number) => {
      const retuObj: any = getModuleData(item2);
      activeObj.list[index] = retuObj;
    });
    returnArr.push(activeObj);
  });

  return returnArr;
};

export const getDetail_end = (id: number) => {
  // 预留函数
};

//未开始的活动
export const getOtherActive = () => {
  const nilCover_0 = require("./img/nilcover/nil_0.jpg").default;
  const nilCover_1 = require("./img/nilcover/nil_1.jpg").default;
  const nilCover_2 = require("./img/nilcover/nil_2.jpg").default;
  const nilCover_3 = require("./img/nilcover/nil_3.jpg").default;
  const nilCover_4 = require("./img/nilcover/nil_4.jpg").default;
  const nilCover_5 = require("./img/nilcover/nil_5.jpg").default;
  const nilCover_6 = require("./img/nilcover/nil_6.jpg").default;
  const nilCover_7 = require("./img/nilcover/nil_7.jpg").default;

  const whatLogo = require("./img/nil_logo.svg").default;

  const whatLogoH = 24;

  const dec_1 =
    "助力品牌方绝赞保密中<b>（4月11日公布）</b>微博评论留言，第一个猜中有奖哦~";

  const dec_2 =
    "助力品牌方绝赞保密中<b>（8月5日公布）</b>微博评论留言，第一个猜中有奖哦~";

  const dec_3 =
    "助力品牌方绝赞保密中<b>（6月8日公布）</b>微博评论留言，第一个猜中有奖哦~";

  const dec_4 =
    "助力品牌方绝赞保密中<b>（7月7日公布）</b>微博评论留言，第一个猜中有奖哦~";

  return [
    // {
    //   date: "7.8~8.5",
    //   type: 1,
    //   list: [
    //     {
    //       logoH: whatLogoH,
    //       logo: whatLogo,
    //       cover: nilCover_2,
    //       desc: dec_4,
    //     },
    //     {
    //       logoH: whatLogoH,
    //       logo: whatLogo,
    //       cover: nilCover_3,
    //       desc: dec_4,
    //     },
    //   ],
    // },
    // {
    //   date: "8.6~9.3",
    //   type: 1,
    //   list: [
    //     {
    //       logoH: whatLogoH,
    //       logo: whatLogo,
    //       cover: nilCover_3,
    //       desc: dec_2,
    //     },
    //     {
    //       logoH: whatLogoH,
    //       logo: whatLogo,
    //       cover: nilCover_4,
    //       desc: dec_2,
    //     },
    //   ],
    // },
  ];
};
