//环境监测

window.markComm = {
  browserType() {
    var u = window.navigator.userAgent;
    var u2 = window.navigator.userAgent.toLowerCase();
    var android =
      u2.indexOf("android") > -1 ||
      u2.indexOf("linux") > -1 ||
      u2.indexOf("adr") > -1;

    var Obj = {
      userAgent: u2,
      isWindows: u2.indexOf("windows") > -1,
      isMac: u2.indexOf("macintosh") > -1,
      isWeChat: u2.indexOf("micromessenger") > -1,
      isWeibo: u2.indexOf("weibo") > -1,
      isAndroid: android,
      isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      isQQ: u2.indexOf("qq/") > -1,
      isMobile: u2.indexOf("mobile") > -1,
      isDingTalk: u2.indexOf("dingtalk") > -1,
      isHeda: u2.indexOf("hedan") > -1,
      Hedan_v: versionToNum(u2.split("hedan@")[1]),
    };
    Obj.isPc = !Obj.isMobile;

    if (
      Obj.isWeChat ||
      Obj.isWeibo ||
      Obj.isAndroid ||
      Obj.isIOS ||
      Obj.isQQ ||
      Obj.isMobile ||
      Obj.isDingTalk
    ) {
      Obj.isMobile = true;
    }

    Obj.isPc = !Obj.isMobile;

    return Obj;

    function versionToNum(str) {
      if (str) {
        var str = str.toString();
        var arr = str.split(".");
        var v_arr = [];
        for (var i = 0; i < 3; i++) {
          var el = arr[i];
          if (el) {
            v_arr.push(Number(el));
          } else {
            v_arr.push(0);
          }
        }
        return v_arr;
      } else {
        return "";
      }
    }
  },
  htmlfontsize(screenwidth, callback) {
    var divObj = document.createElement("div");
    var htmlElem = document.getElementsByTagName("html")[0];

    htmlElem.appendChild(divObj);
    htmlElem.style.fontSize = "100px";
    var winW = divObj.offsetWidth;
    var fontSizeNum = (100 / screenwidth) * winW;
    var fontSizeRatio = parseInt(
      htmlElem.style.fontSize.replace(/[^0-9]/gi, "") / 100,
      10,
    );
    var pxValue = fontSizeNum / fontSizeRatio;
    htmlElem.style.fontSize = pxValue + "px";
    callback && callback();
  },
};

function mar_load() {
  window.markComm.htmlfontsize(1920);

  var bor = window.markComm.browserType();

  // if (bor.isMobile) {
  //   window.location.href = "//m.hedan.art";
  // }
}

//兼容 ie9
if (window["context"] === undefined) {
  if (!window.location.origin) {
    window.location.origin =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
  }
  window["context"] = location.origin + "/V6.0";
}
//兼容 ie9 === end

//逻辑部分
mar_load();
