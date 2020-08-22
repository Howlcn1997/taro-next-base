import Taro from "@tarojs/taro";
import session from "./session";

const HOST = "https://ssss.com";

const logInfo = (text, data) =>
  console.log(`%c ${text}`, "background: blue; color: white", data);

const logError = (text, data) =>
  console.log(`%c ${text}`, "background: red; color: white", data);

const requestAPI = ({ url, method = "POST", data = {}, ...rest }) => {
  if (!url) return;
  return new Promise((resolve, reject) => {
    const __url = domain + url;
    const __method = method.toLocaleUpperCase();
    Taro.request({
      url: __url,
      method: __method,
      data: data,
      dataType: "json",
      ...rest,
      success: (res) => {
        // logInfo(`HTTP request 【success】 status:${res.statusCode}`);
        resolve(res.data);
      },
      fail: (err) => {
        logError(`HTTP request 【fail】: ${err}`);
        reject(err);
      },
    });
  });
};

const api = (url, data = {}, method) => {
  return new Promise((resolve, reject) => {
    const sessionId = session.getSession();
    const requestData = {
      ...data,
      session_id: sessionId,
    };
    logInfo("request url", url);
    logInfo("request prams", requestData);
    Taro.request({
      url: HOST + url,
      method: method || "POST",
      dataType: "json",
      data: requestData,
      //成功操作
      success: function (requestRes) {
        const { data: res, statusCode } = requestRes;
        logInfo(`[${method || "POST"}] ${url}【status:${statusCode}】:`, res);
        resolve(res);
      },
      //失败操作
      fail: function (error) {
        logError(`请求失败，进入fail回调`, error.errMsg);
        Taro.showToast({
          title: error.errMsg || error,
          icon: "none",
        });
        reject(error);
      },
      complete: function () {},
    });
  });
};

export { logInfo, logError, requestAPI };

export default api;
