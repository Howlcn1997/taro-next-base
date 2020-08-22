import Taro from "@tarojs/taro";
import React from "react";
import { View } from "@tarojs/components";

function BackIcon(props) {
  const { onClick, style = {} } = props;
  const defaultClick = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  return (
    <View
      className="icon-chevron-left"
      style={{
        fontSize: "25px",
        width: "25px",
        textAlign: "center",
        display: "inline-block",
        lineHeight: "25px",
        ...style,
      }}
      onClick={typeof onClick === "function" ? onClick : defaultClick}
    ></View>
  );
}

export default BackIcon;
