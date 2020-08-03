import { ajax_json } from "@/utils/http";

export const getDetail = (data: { locationId: string }) => {
  return ajax_json({
    url: `/api/location/detail/${data.locationId}`,
    data,
    method: "get",
  });
};

export const getMomentList = (data: {
  locationId: string;
  tab: 1 | 2;
  pageSize: number;
  pageIndex: number;
}) => {
  return ajax_json({
    url: `/api/location/moment/list/${data.locationId}`,
    data,
    method: "get",
  });
};
