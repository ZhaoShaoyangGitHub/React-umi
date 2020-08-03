function typeCount(Obj: any) {
  let str = "";
  let type = "111";

  if (Obj && Obj.list.length && Obj.list[0]) {
    str += Obj.list[0].type;
  } else {
    str += "1";
  }
  if (Obj && Obj.list.length && Obj.list[1]) {
    str += Obj.list[1].type;
  } else {
    str += "1";
  }
  if (Obj && Obj.list.length && Obj.list[2]) {
    str += Obj.list[2].type;
  } else {
    str += "1";
  }
  // 9当成1
  //0当成1
  // 1开头则2结尾
  // 2开头则1结尾
  // 1开头1结尾
  // 3开头3结尾
  let a: any = str.substring(0, 1);
  let b: any = str.substring(str.length - 1, str.length);
  if (a - 9 === 0) {
    a = "1";
  }
  if (b - 9 === 0) {
    b = "1";
  }
  if (a - 0 === 0) {
    a = "1";
  }
  if (b - 0 === 0) {
    b = "1";
  }

  if (a === "1" && b === "2") {
    type = "12";
  }
  if (a === "2" && b === "1") {
    type = "21";
  }

  if (a === "3" && b === "3") {
    type = "3";
  }
  if (a === "1" && b === "1") {
    type = "111";
  }
  return type;
}

export const formatList = (resList: Array<any>) => {
  const returnArr = [];

  let Obj: any = {};
  Obj.list = [];
  for (let i = 0; i < resList.length; i += 3) {
    Obj.list = resList.slice(i, i + 3);
    Obj.type = typeCount(Obj);
    returnArr.push(Obj);
    Obj = {};
    Obj.list = [];
  }
  return returnArr;
};
export const xxx = () => {};
