import Taro from "@tarojs/taro";
import { Component } from "react";
import "./app.scss";

class App extends Component {
  componentWillMount() {
    // 全局常量设置
    try {
      const systemInfo = Taro.getSystemInfoSync();

      Taro.$navBarMarginTop = systemInfo.statusBarHeight || 0; //通知栏高度
      Taro.$deviceBrand = systemInfo.brand || "暂无品牌信息";
      Taro.$deviceModel = systemInfo.model || "暂无型号信息";
      Taro.$deviceSystemVersion = systemInfo.system || "暂无系统版本信息";
      Taro.$devicePixelRatio = systemInfo.pixelRatio || 2; //设备像素比
      Taro.$deviceScreenWidth = systemInfo.screenWidth || 0;
      Taro.$deviceScreenHeight = systemInfo.screenHeight || 0;
      Taro.$deviceWindowWidth = systemInfo.windowWidth || 0;
      Taro.$deviceWindowHeight = systemInfo.windowHeight || 0;
      Taro.$deviceSafeArea = systemInfo.safeArea || {}; // 安全区

      // 兼容偶发性无法获取到胶囊信息/部分机型获取报错的情况
      let menuButtonRect = !!Taro.getMenuButtonBoundingClientRect
        ? Taro.getMenuButtonBoundingClientRect()
        : null;
      if (menuButtonRect === null || !menuButtonRect.top) {
        // 兼容处理  模拟胶囊数据
        const isIOS = !!~systemInfo.platform.search("ios"); // 平台
        const menuButtonWidth = isIOS ? 88 : 96;
        const menuButtonMarginRight = isIOS ? 7 : 10;
        const menuButtonMarginTop = isIOS ? 4 : 8;
        menuButtonRect = {
          bottom: Taro.$navBarMarginTop + 4 + 32, // 通知栏高度 + 胶囊至通知栏距离 + 胶囊高度
          height: 32,
          left:
            Taro.$deviceWindowWidth - menuButtonWidth - menuButtonMarginRight,
          right: Taro.$deviceWindowWidth - menuButtonMarginRight,
          top: Taro.$navBarMarginTop + menuButtonMarginTop,
          width: menuButtonWidth,
        };
      }

      Taro.$menuButtonRect = menuButtonRect; // 微信胶囊信息
      Taro.$navBarHeight =
        (Taro.$menuButtonRect.top - Taro.$navBarMarginTop) * 2 +
        Taro.$menuButtonRect.height; // 导航栏高度
      Taro.$tabBarHeight = 60;

      // 此项针对IOS(iPhone X及以上)设备Home Bar的适配
      Taro.$deviceIOSHomeBar =
        !!~Taro.$deviceModel.search("iPhone") && Taro.$deviceScreenHeight >= 812
          ? Taro.$deviceWindowHeight -
            Taro.$deviceSafeArea.height -
            Taro.$navBarHeight
          : 0;
      console.log("系统信息:\n", systemInfo);
    } catch (e) {
      console.error("getSystemInfoSync catch error :", e);
    }
  }
  render() {
    return this.props.children;
  }
}

export default App;
