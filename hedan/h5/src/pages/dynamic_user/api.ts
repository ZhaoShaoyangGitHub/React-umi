import { ajax_json } from "@/utils/http";

export const getDetail = (data: { momentId: string }) => {
  return ajax_json({
    url: `/api/moment/detail/${data.momentId}`,
    data,
    method: "get",
  });
};
export const getCommenList = (data: {
  momentId: string;
  pageSize: number;
  pageIndex: number;
}) => {
  return ajax_json({
    url: `/api/moment/comment/list/${data.momentId}`,
    data,
    method: "get",
  });
};
