import { Toast } from "antd-mobile";
export const res_dispose = (response: any) => {
  const data = response.data;
  switch (data.code) {
    case "OK":
      break;
    default:
      Toast.fail(data.message, 1);
      break;
  }
  return data;
};
