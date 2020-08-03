/*
        生成0 ~ w 之间的随机整数 -20 为 left
        生成0 ~ h 之间的随机整数  -10 为 top
      */

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const leftNum = (num: number) => {
  return num - 100;
};

export const topNum = (num: number) => {
  return num - 10;
};

export const cloud = (num: number, w: number, h: number): Array<any> => {
  const cloudTypeArr: any = [];
  for (let i = 0; i <= num; i++) {
    const type = random(1, 5);
    const left = leftNum(random(0, w));
    const top = topNum(random(0, h));
    const jump = random(1, 7);
    const cloudObj = {
      type,
      left,
      top,
      jump,
    };
    cloudTypeArr.push(cloudObj);
  }

  return cloudTypeArr;
};
