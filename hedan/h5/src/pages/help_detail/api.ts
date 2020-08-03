import {ajax_json} from "@/utils/http";

export const getDetail = async (data: {id: any}) => {
  const res: any = await ajax_json({
    url: `/api/help/detail/${data.id}`,
    data,
    method: "get",
  });
  if (res.code === "OK") {
    //
  } else {
    res.data = {};
  }
  return res;
};
export const xxx = (data: {}) => {};
