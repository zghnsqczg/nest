import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import VueHook from "alova/vue";

// 1. 创建alova实例
const alovaInstance = createAlova({
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,
  baseURL: "/api",
  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // 全局的响应拦截器
  responded: (response) => response.json(),
});

export default alovaInstance;
