import Taro from "@tarojs/taro";
import React from "react";
import { View } from "@tarojs/components";

function HomeIcon(props) {
  const { onClick, style = {} } = props;
  const defaultClick = () => {
    Taro.navigateBack({
      delta: 12,
    });
  };

  return (
    <View
      className="icon-home"
      style={{
        width: "25px",
        textAlign: "center",
        fontSize: "18px",
        display: "inline-block",
        lineHeight: "25px",
        ...style,
      }}
      onClick={typeof onClick === "function" ? onClick : defaultClick}
    ></View>
  );
}

export default HomeIcon;
