import { ajax_json } from "@/utils/http";

interface jianshu_RecommendList {
  seen_ids?: string;
  count: number;
  only_unfollowed: boolean;
}

export const getRecommendList = (data: jianshu_RecommendList) => {
  /*
   * @description:  简书的推荐者作者排行列表
   * @return:
   */
  return ajax_json({
    url: "/api/goods/recommend",
    data,
    method: "get",
    abc: 123,
  });
};
