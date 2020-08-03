import { ajax_json } from "@/utils/http";

export const getOriginal = (data: {
  customerId: string;
  pageIndex: number;
  pageSize: number;
}) => {
  return ajax_json({
    url: `/api/customer/moment/original/${data.customerId}`,
    data,
    method: "get",
  });
};

export const getUserDetail = (data: { customerId: string }) => {
  return ajax_json({
    url: `/api/customer/detail/${data.customerId}`,
    data,
    method: "get",
  });
};
