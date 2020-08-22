import Taro from '@tarojs/taro'
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
    backHidden, //强制隐藏或显示back  true强制隐藏  false强制显示
    homeHidden, //强制隐藏或显示home
    onBackClick, //定制backIcon触发函数
    onHomeClick, //定制homeIcon触发函数
    customLeft = false, // 是否自定义左部布局
    renderLeft, // 自定义左部样式 [仅当 customLeft 为 true 时生效]
  } = props;
  const [needback, setNeedback] = useState(false);
  const [needhome, setNeedhome] = useState(false);

  useEffect(() => {
    const pages = Taro.getCurrentPages();

    if (pages.length > 1) {
      setNeedback(this.props.hasOwnProperty("backHidden") ? !backHidden : true);
    }
    if (!homeHidden && pages.length > 2) {
      setNeedhome(this.props.hasOwnProperty("homeHidden") ? !homeHidden : true);
    }
  }, [backHidden, homeHidden]);

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
          {customLeft && <View>{renderLeft()}</View>}
          {!customLeft && (
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
