import Taro from "@tarojs/taro";

export default class Session {
  static setSession(session_id) {
    Session.id = session_id;
    try {
      Taro.setStorageSync("__package__session_id", session_id);
    } catch (e) {
      console.error(`setStorageSync session in api.js ${e}`);
    }
  }

  static clearSession() {
    Session.id = undefined;
  }

  static getSession() {
    if (Session.id === undefined) {
      try {
        Session.id = Taro.getStorageSync("__package__session_id");
      } catch (e) {
        console.error(`getStorageSync session in api.js ${e}`);
        Session.clearSession();
      }
    }
    return Session.id;
  }
}
