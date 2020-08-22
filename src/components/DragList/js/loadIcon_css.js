import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import "../scss/loadIcon_css.scss";

export default class LoadIcon_CSS extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { size = 16, width = 3 } = this.props;
    const bothRotate = (() => {
      let __deg = this.props.deg % 360;
      if (this.props.deg === 360) {
        __deg = 360;
      }
      return {
        left: __deg > 180 ? __deg - 180 : 0,
        right: __deg < 180 ? __deg : 180,
      };
    })();
    return (
      <View
        class="loadIcon"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <View class="loadIcon-left">
          <View
            class="loadIcon-halfCircle"
            style={{ transform: `rotate(${bothRotate.left + 180}deg)` }}
          >
            <View
              class="loadIcon-halfCircle-circleMask"
              style={{
                width: `${size - width}px`,
                height: `${size - width}px`,
              }}
            ></View>
            <View class="loadIcon-halfCircle-mask"></View>
          </View>
          <View class="mask"></View>
        </View>
        <View class="loadIcon-right">
          <View
            class="loadIcon-halfCircle"
            style={{ transform: `rotate(${bothRotate.right + 180}deg)` }}
          >
            <View
              class="loadIcon-halfCircle-circleMask"
              style={{
                width: `${size - width}px`,
                height: `${size - width}px`,
              }}
            ></View>
            <View class="loadIcon-halfCircle-mask"></View>
          </View>
          <View class="mask"></View>
        </View>
      </View>
    );
  }
}
