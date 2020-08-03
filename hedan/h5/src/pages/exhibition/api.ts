import { ajax_json } from "@/utils/http";

export const getDetail = (data: { exhibitionId: string }) => {
  return ajax_json({
    url: "/api/exhibition/detail",
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
    url: "/api/exhibition/toy/list",
    data,
    method: "get",
  });
};
