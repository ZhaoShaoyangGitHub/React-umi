import { ajax_json } from "@/utils/http";

export const getList = (data: { customerId: string }) => {
  return ajax_json({
    url: `/api/customer/cabinet/list/${data.customerId}`,
    data,
    method: "get",
  });
};
export const getSkin = (data: { customerId: string }) => {
  return ajax_json({
    url: `/api/customer/cabinet/skin/${data.customerId}`,
    data,
    method: "get",
  });
};
