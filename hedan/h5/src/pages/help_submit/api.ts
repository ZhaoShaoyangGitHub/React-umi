import { ajax_json } from "@/utils/http";

export const submitFeedback = async (data: any) => {
  const res: any = await ajax_json({
    url: "/api/u/feedback/submit",
    data,
    method: "post",
  });
  if (res.code === "OK") {
    //
  } else {
    res.data = {};
  }
  return res;
};
export const xxx = (data: {}) => {};
