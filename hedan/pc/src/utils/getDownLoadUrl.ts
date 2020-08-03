import { ajax_json } from "@/utils/http";
import { APPSTORE_LINK, ANDROID_LINK } from "@/config/constants";

export const getAppDownUrl = async () => {
  const res: any = await ajax_json({
    url: "/api/system/version/list",
    data: "",
    method: "get",
  });

  const androidUrl = res.data.androidPackageLink || ANDROID_LINK;
  const iosUrl = res.data.iosPackageLink || APPSTORE_LINK;

  return {
    androidUrl,
    iosUrl,
  };
};
export const xxxxx = () => {};
