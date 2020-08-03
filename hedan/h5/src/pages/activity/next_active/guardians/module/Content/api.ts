import {ajax_json} from "@/utils/http";

export const getPrizeList = (data: {activityCode: string}) => {
  return ajax_json({
    url: "/api/activity/prize/list",
    data,
    method: "get",
    abc: 123,
  });
};
