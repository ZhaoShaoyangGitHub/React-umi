import {ajax_json} from "@/utils/http";

export const getDetail = (data: {stickerId: string}) => {
  return ajax_json({
    url: `/api/sticker/detail/${data.stickerId}`,
    data,
    method: "get",
  });
};
