import { ajax_json } from "@/utils/http";

export const getDetail = (data: { topicId: string }) => {
  return ajax_json({
    url: `/api/topic/detail/${data.topicId}`,
    data,
    method: "get",
  });
};
export const getList = (data: {
  topicId: string;
  tab: 2;
  pageSize: number;
  pageIndex: number;
}) => {
  return ajax_json({
    url: `/api/topic/moment/list/${data.topicId}`,
    data,
    method: "get",
  });
};
