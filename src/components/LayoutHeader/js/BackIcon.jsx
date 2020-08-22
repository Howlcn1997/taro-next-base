import Taro from '@tarojs/taro'
import React, { useState, useEffect } from "react";
import { Image } from "@tarojs/components";

function BackIcon(props) {
  const { onClick } = props;
  const defaultClick = () => {
    Taro.navigateBack({
      delta: 1
    });
  };

  return (
    <Image
      src="https://img.ifchange.com/dsp/miniprogram/assessImg/back@2x.png"
      mode="widthFix"
      style={{ width: "25px", height: "25px" }}
      onClick={typeof onClick === "function" ? onClick : defaultClick}
    />
  );
}

export default BackIcon;
