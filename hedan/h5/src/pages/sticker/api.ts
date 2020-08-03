import {ajax_json} from "@/utils/http";

export const getList = (data: {}) => {
  return ajax_json({
    url: "/api/sticker/list",
    data,
    method: "get",
  });
};
