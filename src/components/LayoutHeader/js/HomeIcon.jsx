import Taro from '@tarojs/taro'
import React, { useState, useEffect } from "react";
import { Image } from "@tarojs/components";

function HomeIcon(props) {
  const { onClick } = props;
  const defaultClick = () => {
    Taro.navigateBack({
      delta: 12,
    });
  };

  return (
    <Image
      src="https://img.ifchange.com/dsp/miniprogram/assessImg/home@2x.png"
      mode="widthFix"
      style={{ width: "25px", height: "25px" }}
      onClick={typeof onClick === "function" ? onClick : defaultClick}
    />
  );
}

export default HomeIcon;
