import { ajax_json } from "@/utils/http";

export const getDetail = (data: { robotId: string }) => {
  return ajax_json({
    url: `/api/robot/detail/${data.robotId}`,
    data,
    method: "get",
  });
};
export const xxxx = (data = {}) => {
  return ajax_json({
    url: "xxx",
    data,
    method: "get",
  });
};
