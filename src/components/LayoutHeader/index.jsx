import Taro from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import BackIcon from "./js/BackIcon";
import HomeIcon from "./js/HomeIcon";

import "./index.scss";

/**
 * 小程序custom顶部导航，默认自适应显示back home按钮
 */
export default function LayoutHeader(props) {
  const {
    title = "",
    navStyle = {},
    wrapStyle = {},
    ghostHidden = false,
    showBack, //强制隐藏或显示back  true强制显示  false强制隐藏
    showHome, //强制隐藏或显示home
    onBackClick, //定制backIcon触发函数
    onHomeClick, //定制homeIcon触发函数
    renderLeft, // 自定义左部样式
  } = props;
  const [needback, setNeedback] = useState(false);
  const [needhome, setNeedhome] = useState(false);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const isSetShowBack = "showBack" in props;
    const isSetShowHome = "showHome" in props;

    if (isSetShowBack || pages.length > 1) {
      setNeedback(isSetShowBack ? showBack : true);
    }
    if (isSetShowHome || pages.length > 2) {
      setNeedhome(isSetShowHome ? showHome : true);
    }
  }, [showBack, showHome]);

  return (
    <View>
      {!ghostHidden && (
        <View
          className="layout-header_ghost"
          style={{ height: Taro.$navBarMarginTop + Taro.$navBarHeight + "px" }}
        ></View>
      )}
      <View
        className="layout-header"
        style={{
          paddingLeft:
            Taro.$deviceScreenWidth - Taro.$menuButtonRect.right + "px",
          ...wrapStyle,
        }}
      >
        <View style={{ height: Taro.$navBarMarginTop + "px" }}></View>
        <View
          className="layout-header_nav"
          style={{
            height: Taro.$navBarHeight + "px",
            zIndex: 9999,
            ...navStyle,
          }}
        >
          {renderLeft && <View>{renderLeft()}</View>}
          {!renderLeft && (
            <View className="layout-header_nav_defaultIcons">
              {needback && <BackIcon onClick={onBackClick} />}
              {needhome && <HomeIcon onClick={onHomeClick} />}
            </View>
          )}
          {title !== "" && <View className="layout-header_title">{title}</View>}
        </View>
      </View>
    </View>
  );
}
