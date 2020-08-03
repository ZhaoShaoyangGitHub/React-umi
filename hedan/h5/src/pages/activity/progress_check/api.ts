import {ajax_json} from "@/utils/http";
import {ACTIVITYCODE} from "../active_config";
export const getUserInfo = () => {
  return ajax_json({
    url: "/api/u/info/detail",
    data: "",
    method: "get",
  });
};

export const getProgressList = () => {
  return ajax_json({
    url: "/api/u/activity/progress/list",
    data: {
      activityCode: ACTIVITYCODE,
    },
    method: "get",
  });
};

export const getProgressList_end = (data: {activityCode: string}) => {
  return ajax_json({
    url: "/api/u/activity/progress/list",
    data,
    method: "get",
  });
};

export const getProgressDetail = (id: string) => {
  return ajax_json({
    url: "/api/u/activity/progress/detail",
    data: {
      activityCode: ACTIVITYCODE,
      frontId: id,
    },
    method: "get",
  });
};
