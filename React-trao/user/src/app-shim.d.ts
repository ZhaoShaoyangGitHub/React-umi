import Taro, { Component } from "@tarojs/taro";

declare module "@tarojs/taro" {
  interface Component {
    $apis: any;
  }
  let globalData: any;
}

//声明
declare const require: any;
declare const dispach: any;
