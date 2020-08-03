import { ajax_json } from "@/utils/http";

export const getJobText = async (data = {}) => {
  const res: any = await ajax_json({
    url: "/api/landing/job",
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
export const getInfoList = async (data = {}) => {
  const res: any = await ajax_json({
    url: "/api/landing/toy/robot",
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

export const getImageList = async (data = {}) => {
  const res: any = await ajax_json({
    url: "/api/landing/moment/image",
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
export const getVideo = async (data = {}) => {
  const res: any = await ajax_json({
    url: "/api/landing/video",
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
