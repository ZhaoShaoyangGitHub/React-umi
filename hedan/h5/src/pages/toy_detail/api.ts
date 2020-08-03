import { ajax_json } from "@/utils/http";

export const getDetail = (data: { toyId: string }) => {
  return ajax_json({
    url: `/api/wiki/toy/detail/${data.toyId}`,
    data,
    method: "get",
  });
};
export const getList = (data: {
  exhibitionId: string;
  pageSize: number;
  pageIndex: number;
}) => {
  return ajax_json({
    url: "xxxx",
    data,
    method: "get",
  });
};
