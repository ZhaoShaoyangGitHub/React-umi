import {ajax_json} from "@/utils/http";
import {APPSTORE_LINK, ANDROID_LINK} from "@/config/constants";

const win: any = window;

export const getAppDownUrl = async () => {
  const browserType = win.markComm.browserType();
  let returnUrl = "";

  const res: any = await ajax_json({
    url: "/api/system/version/list",
    data: "",
    method: "get",
  });

  if (browserType.isAndroid) {
    returnUrl = res.data.androidPackageLink || ANDROID_LINK;
  } else {
    returnUrl = res.data.iosPackageLink || APPSTORE_LINK;
  }

  return returnUrl;
};
export const xxxxx = async () => {
  const browserType = win.markComm.browserType();
  let param = {
    type: "ios",
    market: 0,
  };
  let returnUrl = APPSTORE_LINK;
  if (browserType.isAndroid) {
    param = {
      type: "android",
      market: 8,
    };
    returnUrl = ANDROID_LINK;
  }

  const res: any = await ajax_json({
    url: "/api/system/version/app",
    data: param,
    method: "get",
  });

  if (res.data) {
    returnUrl = res.data.packageLink;
  }

  return returnUrl;
};
