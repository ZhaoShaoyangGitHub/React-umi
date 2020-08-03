import {ajax_json} from "@/utils/http";

export const setReceiveInfo = (data: {
  activityCode: string;
  frontId: number;
  receiveAddress: string;
  receiveName: string;
  receivePhone: string;
}) => {
  return ajax_json({
    url: "/api/u/activity/receive/info",
    data,
    method: "post",
  });
};
