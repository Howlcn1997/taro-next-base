import Taro from "@tarojs/taro";
import { Canvas, CoverView } from "@tarojs/components";
import React, { Component } from "react";


/**
 * 圆周加载icon  默认顺时针加载
 * @param {Object} rate 当前圆周周长占比 0 ~ 1
 * @param {Object} refreshConfig 外部可干预每一帧的渲染
 */

export default class loadIcon extends Component {
  constructor() {
    this.ctx = null;
    this.height = 20;
    this.width = 20;

    this.canvasId = "loading-icon-taro";
    this.create = this.create.bind(this);

    // 默认帧绘制config
    this.defaultRefreshConfig = {
      color: "rgb(39,117,255)",
      lineWidth: 1.5,
      Ox: this.width / 2,
      Oy: this.height / 2,
      r: this.width / 2 - 2 * 2,
      startAngle: 0,
      endAngle: 0,
      antiClockWise: false,
      ...(this.props.refreshConfig || {}),
    };
  }

  componentDidMount() {
    this.create();
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh({
      endAngle: Math.PI * 2 * (this.props.rate > 1 ? 1 : this.props.rate),
    });
  }

  // 创建画布
  create(config) {
    // const { backgroundColor = "#fff" } = config;
    this.ctx = Taro.createCanvasContext(this.canvasId, this.$scope);
  }

  /**
   * 帧绘制
   * @param {float} rate 周长占比  0 ~ 1
   */
  refresh(EXconfig) {
    const __config = { ...this.defaultRefreshConfig, ...EXconfig };
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.setStrokeStyle(__config.color);
    this.ctx.setLineWidth(__config.lineWidth);
    this.ctx.arc(
      __config.Ox,
      __config.Oy,
      __config.r,
      __config.startAngle,
      __config.endAngle,
      __config.antiClockWise
    );
    this.ctx.stroke();
    this.ctx.draw();
  }

  render() {
    const { style = {} } = this.props;
    return (
      <Canvas
        canvasId={this.canvasId}
        style={{
          ...style,
          height: this.height + "px",
          width: this.width + "px",
        }}
      ></Canvas>
    );
  }
}
