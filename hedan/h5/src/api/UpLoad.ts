/*
 * @LastEditors: Mark
 * @Description: none
 * @Author: Mark
 * @Date: 2019-06-18 19:06:46
 * @LastEditTime: 2019-06-19 11:24:04
 */

// import { ajax } from '@/utils/http';

import axios from "axios";
export const upLoadImage = (file: object) => {
  return axios({
    url: "/api/ueditor",
    method: "post",
    data: {
      upfile: file,
      action: "uploadimage",
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: [
      (data, headers) => {
        const formData = new FormData();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        return formData;
      },
    ],
  });
};

export const upLoadFile = (file: object) => {
  return axios({
    url: "/api/ueditor",
    method: "post",
    data: {
      upfile: file,
      action: "uploadfile",
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: [
      (data, headers) => {
        const formData = new FormData();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        return formData;
      },
    ],
  });
};
