/* eslint-disable no-eval */
export const atFilter = (detail: any, item?: Array<string>) => {
  let content = String(detail.content || "");

  if (item) {
    content = detail[item[0]];
  }

  if (!content) {
    return "";
  }

  /*
    topicList   #
    atUserList  @
  */

  const isTopicList = content.indexOf("#");
  if (isTopicList > -1) {
    const { topicList } = detail;
    topicList.forEach((el: any) => {
      const repTitle = el.title;
      const Elm = `<span class="topicClick" data-id="${el.topicId}">${repTitle}</span>`;
      const reg = `/${repTitle}/g`;
      try {
        const regX = eval(reg);
        content = content.replace(regX, Elm);
      } catch {
        content = content.replace(reg, Elm);
      }
    });
  }

  const isAtUser = content.indexOf("@");

  if (isAtUser > -1) {
    const { atUserList } = detail;

    atUserList.forEach((el: any) => {
      const repName = el.nickname;
      const Elm = `<span class="atUserClick" data-id="${el.userId}">${repName}</span>`;
      const reg = `/${repName}/g`;

      try {
        const regX = eval(reg);
        content = content.replace(regX, Elm);
      } catch {
        content = content.replace(reg, Elm);
      }
    });
  }

  return content;
};

export const xxx = () => {};
