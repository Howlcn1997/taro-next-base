import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import LayoutHeader from "../LayoutHeader";
import LayoutTabbar from "../LayoutTabbar";
import "./index.scss";

/**
 *  isShowHeader 是否显示自定义头部
 *  isShowTabBar 是否显示自定义底部
 */

export default class Layout extends Component {
  render() {
    const {
      title,
      children,
      showHeader = true,
      isShowTabBar = false,
      headerProps = {},
      tabbarProps = {},
      current,
    } = this.props;
    return (
      <View
        className="layout"
        style={{
          position: "relative",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          height: Taro.$deviceScreenHeight + "px",
        }}
      >
        {showHeader && <LayoutHeader title={title} {...headerProps} />}
        <View
          className="layout-content"
          style={{
            width: "100%",
            flex: 1,
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {children}
        </View>
        {isShowTabBar && <LayoutTabbar {...tabbarProps} />}
      </View>
    );
  }
}
