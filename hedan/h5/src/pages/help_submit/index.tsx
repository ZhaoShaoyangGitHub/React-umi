import React from "react";
import styles from "./index.module.scss";

import {getUrlParam} from "@/utils/utils";
import {TextareaItem, Button, Toast} from "antd-mobile";

import {upLoadImage} from "@/api/UpLoad";
import UpLoadFile from "@/components/UpLoadFile";

import {submitFeedback} from "./api";

import dsBridge from "dsbridge";

const win: any = window;

const browserType = win.markComm.browserType();

// browserType.isIOS = true;
// browserType.isHedanApp = true;

type StateType = {
  content: string;
  [propName: string]: any;
};

class Page extends React.Component<props> {
  private describeRef: any;

  constructor(props: props) {
    super(props);
    this.describeRef = React.createRef();
  }

  state: StateType = {
    content: "",
    //图片上传
    images: [],
    maxImgNum: 8,
  };

  componentDidMount() {
    this.describeRef.current.placeholder =
      "描述你遇到的问题，使用场景/具体功能等，也可以微信号 heDANkefu 反馈错误或者愿意帮助我们完善资料哦~";
    const {id} = getUrlParam();
    this.geiIosImgUrl();
  }

  change = (value: string) => {
    if (value.length <= 610) {
      this.setState(
        {
          content: value,
        },
        () => {
          const {content} = this.state;
          if (content === "") {
            this.describeRef.current.placeholder =
              "描述你遇到的问题，使用场景/具体功能等，也可以微信号 heDANkefu 反馈错误或者愿意帮助我们完善资料哦~";
          } else {
            this.describeRef.current.placeholder = "";
          }
        },
      );
    }
  };

  submit = () => {
    const {content, images} = this.state;
    const _this = this;

    if (content) {
      submitFeedback({
        content,
        imageList: images,
      }).then((res) => {
        if (res.code === "OK") {
          Toast.success("提交成功!", 1, () => {
            _this.props.history.push("/help");
          });
        }
      });
    } else {
      Toast.fail("内容不可为空");
    }
  };

  //图片选择

  imageChange = (files: any, type: any) => {
    const _this = this;
    const {maxImgNum} = _this.state;
    const fileList = files;
    if (type === "add") {
      for (let i = 0; i < fileList.length; i++) {
        const el = fileList[i];
        if (el.size - 10000000 < 0) {
          Toast.loading("正在上传...", 200);
          if (typeof el.file === "object") {
            upLoadImage(el.file)
              .then((res) => {
                if (res.data.size) {
                  Toast.hide();
                  fileList[i] = res.data;
                  updateFiles();
                } else {
                  Toast.fail(res.data.state, 1);
                }
              })
              .catch((err) => {
                fileList.splice(i, 1);
                updateFiles();
                Toast.fail("有一张图片上传失败", 1);
              });
          } else {
            updateFiles();
          }
        } else {
          fileList.splice(i, 1);
          updateFiles();
          Toast.fail("图片太大请重新选择", 1);
        }
      }
    } else {
      updateFiles();
    }
    function updateFiles() {
      _this.setState({
        images: fileList.slice(0, maxImgNum),
      });
    }
  };

  geiIosImgUrl = () => {
    const _this = this;
    const {images} = this.state;
    dsBridge.register("deliveryUrl", function (url: any, r: any) {
      const urlObj = {
        url,
      };
      images.push(urlObj);
      _this.setState({
        images,
      });
    });

    //test
    // const url =
    //   "http://file.hedan.art/FnhgBB9nRiVOSZQoKI7Y26_SSXoD?imageView2/2/w/400";

    // const urlObj = {
    //   url,
    // };
    // images.push(urlObj);
    // _this.setState({
    //   images,
    // });
    //test
  };

  iosUpload = () => {
    dsBridge.call("UploadImage");

    // test;
    // this.geiIosImgUrl();
    // test -- end
  };

  render() {
    const {content, images, maxImgNum} = this.state;

    let isUploadImg = true;
    if (browserType.isHedanApp && browserType.isIOS) {
      isUploadImg = false;
    }

    let isUpImgShow = true;

    if (browserType.isIOS) {
      if (browserType.Hedan_v_sum && browserType.Hedan_v_sum <= 111) {
        isUpImgShow = false;
      }
    }

    return (
      <div className={styles.wrapper}>
        {/* <div className={`${content ? styles.textarea : styles.textareaHeight}`}>
          <TextareaItem
            value={content}
            rows={9}
            placeholder={
              content.length < 1
                ? "描述你遇到的问题，使用场景/具体功能等，也可以微信号 heDANkefu 反馈错误或者愿意帮助我们完善资料哦~"
                : ""
            }
            count={610}
            onChange={(value: any) => {
              this.change(value);
            }}
          />
        </div> */}
        <div className={styles.textareaWrapper}>
          <textarea
            value={content}
            rows={9}
            ref={this.describeRef}
            onChange={(e) => {
              this.change(e.target.value);
            }}
          ></textarea>
          <div className={styles.textareaCount}>
            <span>{content.length}</span>/610
          </div>
        </div>
        {isUpImgShow && (
          <>
            <div>上传凭证（选填）</div>
            <div className={styles.uploadImg}>
              <UpLoadFile
                files={images}
                onChange={this.imageChange}
                onClick={!isUploadImg && this.iosUpload}
                quantity={maxImgNum}
                accept="image/*"
              />
            </div>
          </>
        )}
        <div className={styles.footer}>
          <Button
            onClick={this.submit}
            className={styles.button}
            type="primary"
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}
export default Page;
