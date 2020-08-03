# APP 落地页 URL 文档

## 域名:

测试:

`http://ip-29-hedan-h5.coralcodes.com`

生产:

`http://m.hedan.art`

---

## 文档说明:

所有页面的完整路径均以 `域名 + /页面路径` 构成

参数统一采用 url 参数

域名不表 , 页面路径统一采用小写+下划线的方式 , 参数统一采用驼峰命名法

> 注意: url 大小写不敏感 `userId` 和 `userid` 对浏览器来说其实是一个东西

例子:

http://ip-29-hedan-h5.coralcodes.com/help?userId=123&token=abcd&shareId=3456

---

测试地址:

http://ip-29-hedan-h5.coralcodes.com/sitemap

> 如果需要登录则再链接后面拼上 `?token=xxxx` 多个参数则 `&token=xxxxx`

## 微信中转页

`/out_wx` 这应该是一个模块 , 下载 APP 的时候现实的

参数 :

    无

## APP 介绍和下载页面

``

`?id=xxx`

直接访问域名默认就是 app 落地页面
如:

http://ip-29-hedan-h5.coralcodes.com?id=xxxxx

参数 :

    @id

---

页面地址: APP 内嵌静态页

---

## 帮助与反馈

`/help`

参数 :

    无

## 邀请码说明页

`/invite`

参数 :

    无

## 用户协议(盒 DAN 使用协议)

`/agreement`

参数 :

    无

## 盒 DAN 隐私协议

`/privacy`

参数 :

    无

## 盒 DAN 社区规范

`/specification`

参数 :

    无

## 用户常见问题

`/faq`

参数 :

    无

---

页面地址: 分享页面

---

## 用户个人主页

`/user?userId=xxx`

参数 :

    @userId

## 分享来源落地页 - 爬虫捕捉结果页面

`/source?robotId=xxx`

参数 :

    @robotId

## 展会捕捉设置主页落地页

`/exhibition?exhibitionId=xxx`

参数 :

    @exhibitionId

## 用户动态落地页

`/dynamic_user?momentId=xxx`

参数 :

    @momentId

## 话题落地页

`/topic?topicId=xxx`

参数 :

    @topicId

## 地理位置

`/local?locationId=xxx`

参数 :

    @locationId

## 玩具品牌

`/brand?brandId=xxx`

参数 :

    @brandId

    接口: /api/wiki/brand/detail/{brandId}

    DAN生录

## 玩具落地页

`/toy_detail?toyId=xxx`

参数 :

    @toyId

    接口: /api/wiki/toy/detail/{toyId}

## 玩具柜

`/toy_chest?userId=xxx`

参数 :

    @userId


    接口: /api/customer/cabinet/list/{customerId}

---

页面地址: 活动页面

---

## 玩具守护者

`/activity/guardians?token=xxx`

参数 :

    @token  ---   用户token用于登录 , 没有token会导致无法抽奖

---

## 关于 ToysHunter

`/hunter`

参数 : 无
