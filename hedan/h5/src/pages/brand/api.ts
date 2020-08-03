import { ajax_json } from "@/utils/http";

export const getDetail = (data: { brandId: string }) => {
  return ajax_json({
    url: `/api/wiki/brand/detail/${data.brandId}`,
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
    url: "xxxxx",
    data,
    method: "get",
  });
};
