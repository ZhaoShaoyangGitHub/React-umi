import {ajax_json} from "@/utils/http";

export const activityInfo = (data: {activityCode: string}) => {
  return ajax_json({
    url: "/api/activity/info/",
    data,
    method: "get",
  });
};

export const drawCheck = (data: {activityCode: string; frontId: number}) => {
  return ajax_json({
    url: "/api/u/activity/draw/check",
    data,
    method: "get",
  });
};

export const prizeDetail = (data: {activityCode: string; frontId: number}) => {
  return ajax_json({
    url: "/api/activity/prize/detail",
    data,
    method: "get",
  });
};

export const draw = (data: {activityCode: string; frontId: number}) => {
  return ajax_json({
    url: "/api/u/activity/draw",
    data,
    method: "post",
  });
};
