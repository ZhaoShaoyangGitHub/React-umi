export const fallsData = (list: any[]) => {
  // console.log(list);
  const right: any[] = [];
  const left: any[] = [];

  let leftLen = 0;
  let rightLen = 0;
  list.forEach((item: any, index: number) => {
    const rLen = lenCount(right[right.length - 1]);
    const lLen = lenCount(left[left.length - 1]);
    item.index = index;
    let type = "l";

    if (leftLen > rightLen) {
      type = "r";
    }

    if (type === "l") {
      pushLeft();
    } else {
      pushRight();
    }

    function pushLeft() {
      left.push(item);
      leftLen += lLen;
    }
    function pushRight() {
      right.push(item);
      rightLen += rLen;
    }
  });

  function lenCount(item: any): number {
    if (item) {
      const lenStr = item.description + item.shortLink;
      return lenStr.length;
    } else {
      return 0;
    }
  }

  return {
    right,
    left,
  };
};

export const xxx = () => {};
