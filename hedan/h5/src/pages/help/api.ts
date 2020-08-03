import { ajax_json } from "@/utils/http";

export const getList = async (data = {}) => {
  const res: any = await ajax_json({
    url: "/api/help/group",
    data,
    method: "get",
  });
  if (res.code === "OK") {
    //
  } else {
    res.data = [];
  }
  return res;
};
export const xxx = (data: {}) => {};
