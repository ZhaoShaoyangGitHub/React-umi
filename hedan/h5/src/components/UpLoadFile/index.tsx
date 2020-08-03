/* eslint-disable no-loop-func */
/*
 * @LastEditors: Mark
 * @Description: In User Settings Edit
 * @Author: Mark
 * @Date: 2019-05-05 10:25:14
 * @LastEditTime: 2019-06-24 14:26:56
 */

import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

interface Props {
  files: {}[] | undefined;
  onChange:
    | ((files: {}[], operationType: string, index?: number | undefined) => void)
    | undefined;
  quantity?: number;
  onClick: Function | false;
  multiple?: boolean | undefined;
  accept?: string;
}

class UpLoadFile extends React.Component<Props, object> {
  onChange = (e: any) => {
    const _this = this;
    const input = e.target;
    const filesList = input.files;
    const {onChange} = this.props as any;

    _this.filterChangeData(filesList, (res: any) => {
      onChange(res, "add", res.length);
    });
  };

  filterChangeData = (filesList: any, callback: any) => {
    const _this = this;
    const {files, quantity, accept} = this.props as any;
    const filesCopy = files;
    for (let i = 0; i < filesList.length; i++) {
      const el = filesList[i];
      const Obj: any = {
        file: el,
        title: el.name,
        size: el.size,
        type: el.type,
      };
      if (el.type.indexOf("image") > -1 || accept.indexOf("image") > -1) {
        _this.imgTobase64(el, (data: any) => {
          Obj.url = data;
          filesCopy.push(Obj);
          callback(filesCopy.slice(0, quantity));
        });
      } else {
        filesCopy.push(Obj);
        callback(filesCopy.slice(0, quantity));
      }
    }
  };

  imgTobase64 = (file: any, callback: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const dataURL = reader.result;
      callback(dataURL);
    };
  };

  remove = (index: any) => {
    const {files} = this.props as any;
    const fileList = JSON.parse(JSON.stringify(files));
    const {onChange} = this.props as any;
    fileList.splice(index, 1);
    onChange(fileList, "remove", index);
  };

  render() {
    const {accept, multiple, files, quantity, onClick} = this.props as any;

    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          {files.map((item: any, index: any) => {
            return (
              <div className={styles.item} key={index}>
                <div
                  className={styles.removeBtn}
                  onClick={() => {
                    return this.remove(index);
                  }}
                >
                  ×
                </div>
                {accept.indexOf("image") > -1 ? (
                  <img className={styles.cover} alt="" src={item.url} />
                ) : (
                  <div className={styles.title}>{item.title}</div>
                )}
              </div>
            );
          })}
          {files.length < quantity ? (
            <div className={styles.item}>
              <div
                className={styles.addBtn}
                onClick={() => {
                  onClick && onClick();
                }}
              >
                ＋
                {!onClick && (
                  <input
                    className={styles.inputFile}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={this.onChange}
                  />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default UpLoadFile;
